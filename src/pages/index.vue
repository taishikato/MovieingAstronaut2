<template>
  <div class="container">
    <div class="field">
      <div class="control">
        <input class="input is-rounded" type="text" placeholder="Normal input">
      </div>
      <div class="control">
        <button type="submit" class="button is-primary" placeholder="Normal input">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from 'isomorphic-fetch';

export default {
  async asyncData() {
    const response = await fetch('https://nuxt-ssr.firebaseio.com/facts.json');
    const facts = await response.json();
    return { facts };
  }
}
</script>

<style>
</style>

