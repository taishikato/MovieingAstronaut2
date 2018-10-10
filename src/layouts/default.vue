<template>
  <div>
    <nav class="navbar is-transparent is-fixed-top is-white" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            Movieing Astronaut
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
          </a>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">

          <div class="navbar-start">
            <form action="/search" method="get" class="navbar-item">
              <div class="field has-addons">
                <div class="control">
                  <input class="input is-rounded" name="query" type="text" placeholder="Reign Over Me">
                </div>
                <div class="control">
                  <input class="button is-rounded" type="submit" value="Search">
                </div>
              </div>
            </form>
          </div>
          <div class="navbar-end">
            <div v-if="this.$store.getters.getLoginStatus" class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                {{ this.$store.getters.getUserInfo.displayName }}
              </a>

              <div class="navbar-dropdown is-right">
                <a :href="`/u/${this.$store.getters.getUserInfo.userId}`" class="navbar-item">
                  Profile
                </a>
                <a href="/u/likes" class="navbar-item">
                  Likes
                </a>
                <a class="navbar-item" @click.prevent="logout">
                  Logout
                </a>
              </div>
            </div>

            <div class="navbar-item">
              <div class="field is-grouped">
                <p v-if="this.$store.getters.getLoginStatus === false" class="control">
                  <a class="navbar-item" @click.prevent="loginWithGoogle">
                    Login / Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    {{ this.$store.getters.getUserInfo }}
    isLogin
    {{ this.$store.getters.getLoginStatus }}
    <nuxt/>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase"
// Use firestore
import "firebase/firestore"
const firestore = firebase.firestore()
/**
 * TODO: すぐに解決できないので後で
 */
// const settings = {timestampsInSnapshots: true};
// firestore.settings(settings);
const googleProvider = new firebase.auth.GoogleAuthProvider()

import getRedirectResult from "~/plugins/getRedirectResult"
import auth from "~/plugins/auth"
import saveData from "~/plugins/saveData"
import getUser from "~/plugins/getUser"
import updateData from "~/plugins/updateData"

const getUnixTime = () => {
  const date = new Date()
  return Math.floor(date.getTime() / 1000)
}

export default {
  data() {
    return {
      user: null,
      isLogin: false,
      isLoading: true
    }
  },
  async beforeCreate() {
    this.isLogin = this.$store.getters.getLoginStatus
    if (process.browser) {
      const authUser = await auth()
      if (authUser === false) {
        console.log("not login")
        this.isLoading = false
        return
      }
      // ログイン時の情報取得
      const result = await getRedirectResult()
      if (result.user !== null) {
        await this.setCookie()
        const userData = result.user
        const userUid = userData.uid
        let newUserData = {
          displayName: userData.displayName,
          email: userData.email
        }
        const getUserResult = await getUser(usersRef)
        if (getUserResult.exists === false) {
          // Sign up
          console.log("sign up")
          this.userId = userData.uid
          newUserData.created = getUnixTime()
          newUserData.userId = userUid
          newUserData.picture =
            "https://res.cloudinary.com/guidesquare/image/upload/v1526218605/profile-default.png"
          await saveData(usersRef, newUserData)
        } else {
          // Login
          console.log("login")
          const changeItem = {
            lastLogin: getUnixTime()
          }
          await updateData(usersRef, changeItem)
        }
      }

      const usersRef = firestore.collection("users").doc(authUser.uid)
      const getUserResult = await getUser(usersRef)

      // Vuex
      // Firestoreとバインド
      // await this.$store.dispatch("BIND_USER", authUser)
      // Login Statusを変更
      /*
      this.$store.commit("changeLoginStatus", {
        status: true
      })
      */
      // Userを変更
      /*
      this.$store.commit("changeUser", {
        user: getUserResult.data()
      })
      
      this.isLogin = this.$store.getters.getLoginStatus
      this.user = this.$store.getters.getUserInfo
      */
      this.isLoading = false
    }
    // this.isLogin = this.$store.getters.getLoginStatus
    // this.user = this.$store.getters.getUserInfo
  },
  methods: {
    async logout() {
      const self = this
      // Logout
      await firebase.auth().signOut()
      // Firestoreとアンバインド
      await this.$store.dispatch("UNBIND_USER")
      // CommitでVuexの値を変更
      this.$store.commit("changeUser", {
        user: null
      })
      self.$store.commit("changeLoginStatus", {
        status: false
      })
      self.isLogin = false
    },
    loginWithGoogle() {
      firebase.auth().signInWithRedirect(googleProvider)
    },
    async setCookie() {
      // Set the __session cookie.
      const token = await firebase.auth().currentUser.getIdToken(true)
      // set the __session cookie
      // 1 week
      document.cookie = `__session=${token};max-age=604800`
    }
  }
}
</script>

<style>
html {
  background: #eff3f4;
}
a {
  color: darkslategray;
}
</style>
