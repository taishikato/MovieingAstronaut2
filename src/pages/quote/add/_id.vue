<template>
  <div>
    セリフ追加
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input v-model="quote" class="input" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button @click="addQuote" class="button is-link">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
// Use firestore
import 'firebase/firestore';
const firestore  = firebase.firestore();

// Plugins
import addData from '~/plugins/addData';

// Refs
const quotesRef = firestore.collection('quotes');

const getUnixTime = () => {
  const date = new Date();
  return Math.floor(date.getTime() / 1000);
};

export default {
  data() {
    return {
      quote: ''
    }
  },
  methods: {
    async addQuote() {
      const movieId = this.$nuxt.$route.params.id;
      const addDataSet = {
        content: this.quote,
        movieId: movieId,
        userId: this.$store.getters.getUserInfo.userId,
        created: getUnixTime(),
      };
      await addData(quotesRef, addDataSet);
      console.log('Success');
    }
  }
}
</script>

<style>
</style>
