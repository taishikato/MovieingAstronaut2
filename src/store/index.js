import Vue from "vue"
import Vuex from "vuex"

/**
 * @see https://github.com/posva/vuexfire/tree/firestore
 */
import firebase from "~/plugins/firebase"
import "firebase/firestore"
const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)
const usersRef = firestore.collection("users")
import { firebaseMutations, firebaseAction } from "vuexfire"

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      loginStatus: false,
      user: null // Will be bound with firebase
    },
    mutations: {
      changeLoginStatus(state, isLogin) {
        state.loginStatus = isLogin.status
      },
      changeUser(state, data) {
        state.user = data.user
      },
      ...firebaseMutations
    },
    getters: {
      getLoginStatus: state => state.loginStatus,
      getUserInfo: state => state.user
    },
    actions: {
      BIND_USER: firebaseAction(({ bindFirebaseRef }, user) => {
        bindFirebaseRef("user", usersRef.doc(user.uid))
      }),
      UNBIND_USER: firebaseAction(({ unbindFirebaseRef }) => {
        unbindFirebaseRef("user")
      }),
      nuxtServerInit({ commit }, { req }) {
        commit("changeUser", {
          user: req.maData.loginUser
        })
        let isLogin = false
        if (req.maData.loginUser !== {}) isLogin = true
        commit("changeLoginStatus", {
          isLogin
        })
      }
    }
  })

export default store
