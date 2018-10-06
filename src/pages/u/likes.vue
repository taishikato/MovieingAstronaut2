<template>
  <div id="u-likes">
    aaa
  </div>
</template>

<script>
import firebase from "~/plugins/firebase"
// Use firestore
import "firebase/firestore"
const firestore = firebase.firestore()

// Ref
const likeQuoteRef = firestore.collection("likeQuotesByUser")

export default {
  async created() {
    await likeQuoteRef
      .doc(this.$store.getters.getUserInfo.userId)
      .collection("quotes")
      .get()
  }
}
</script>
