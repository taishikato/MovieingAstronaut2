<template>
  <div>
    セリフ追加
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button @click="addQuote" class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button class="button is-text">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
// Use firestore
import 'firebase/firestore';
const firestore  = firebase.firestore();

export default {
  methods: {
    addQuote() {
      console.log('aaa');
    }
  }
}
</script>

<style>
</style>
