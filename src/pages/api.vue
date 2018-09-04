<template>
  <div>
    {{ movies }}
    <ul>
      <li v-for="movie in movies" :key="movie.imdbID">
        <a :href="`/detail/${movie.imdbID}`">
          <img :src="movie.Poster" width="100px" />
          {{ movie.Title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    return { movies: context.req.maData.apiResult.Search };
  }
}
</script>

<style>
</style>