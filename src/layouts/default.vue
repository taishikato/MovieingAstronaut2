<template>
  <div>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            MA
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">
            <a @click.prevent="loginWithGoogle" class="navbar-item">ログイン</a>
          </div>
        </div>
      </div>
    </nav>
    <nuxt/>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
// Use firestore
import 'firebase/firestore';
const firestore  = firebase.firestore();
/**
 * TODO: すぐに解決できないので後で
 */
// const settings = {timestampsInSnapshots: true};
// firestore.settings(settings);
const googleProvider = new firebase.auth.GoogleAuthProvider();

import getRedirectResult from '~/plugins/getRedirectResult';
import auth from '~/plugins/auth';
import saveData from '~/plugins/saveData';
import { mapGetters } from 'vuex';

const getUnixTime = () => {
  const date = new Date();
  return Math.floor(date.getTime() / 1000);
};

export default {
  async beforeCreate() {
    if (process.browser) {
      const authUser = await auth();
      console.log(authUser);
      if (authUser === false) {
        console.log('未ログイン');
      }
      // ログイン時の情報取得
      const result = await getRedirectResult();
      if (result.user === null) return;

      console.log('signupします')
      const userData = result.user;
      const userUid = userData.uid;
      const usersRef = firestore.collection('users').doc(userUid);
      let newUserData = {
        displayName: userData.displayName,
        email      : userData.email,
      };
      // Signup
      this.userId = userData.uid;
      newUserData.created = getUnixTime();
      newUserData.userId = userUid;
      newUserData.picture = 'https://res.cloudinary.com/guidesquare/image/upload/v1526218605/profile-default.png';
      await saveData(usersRef, newUserData);
      // const userInfo = await getUser(userUid, firestore);
      this.user = userInfo.data();
    }
  },
  methods: {
    loginWithGoogle() {
      firebase.auth().signInWithRedirect(googleProvider);
    }
  }
}
</script>


<style>
</style>

