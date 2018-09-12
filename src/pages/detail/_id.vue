<template>
  <div>
    {{ movie }}
    <h2 class="title is-2">{{ movie.Title }}</h2>
    <img :src="movie.Poster" />
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    return { movie: context.req.maData.apiResult };
  }
}
</script>

<style>

</style>
