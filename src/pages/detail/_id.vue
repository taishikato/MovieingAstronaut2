<template>
  <div>
    {{ movie }}
    <h2 class="title is-2">{{ movie.Title }}</h2>
    <p><a :href="`/quote/add/${movie.imdbID}`">セリフ追加</a></p>
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
