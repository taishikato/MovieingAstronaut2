<template>
  <div>
    {{ facts1 }}
  </div>
</template>

<script>
// import fetch from 'isomorphic-fetch';
import axios from 'axios';

export default {
  async asyncData(context) {
    console.log('yeah');
    const { data } = await axios.get('https://www.omdbapi.com/?s=star wars&apikey=1b46575f')
    return { facts1: data };
  }
}
</script>

<style>
</style>