<template>
  <section id="search-query" class="section">
    <div id="search-title" class="has-text-centered">
      <p class="title">"{{query}}"</p>
      <p class="subtitle">Search Results</p>
    </div>
    <div class="container">
      <ul>
        <li class="movie-list-single" v-for="movie in movies" :key="movie.imdbID">
          <a :href="`/detail/${movie.imdbID}`">
            <article class="media">
              <figure class="media-left">
                <p class="image is-96x96">
                  <img :src="movie.Poster">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    {{ movie.Title }}
                  </p>
                </div>
              </div>
            </article>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData(context) {
    /*
    return {
      query: context.query.query,
      movies: [ { "Title": "Star Wars: Episode IV - A New Hope", "Year": "1977", "imdbID": "tt0076759", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode V - The Empire Strikes Back", "Year": "1980", "imdbID": "tt0080684", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode VI - Return of the Jedi", "Year": "1983", "imdbID": "tt0086190", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" }, { "Title": "Star Wars: The Force Awakens", "Year": "2015", "imdbID": "tt2488496", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode I - The Phantom Menace", "Year": "1999", "imdbID": "tt0120915", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode III - Revenge of the Sith", "Year": "2005", "imdbID": "tt0121766", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode II - Attack of the Clones", "Year": "2002", "imdbID": "tt0121765", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg" }, { "Title": "Rogue One: A Star Wars Story", "Year": "2016", "imdbID": "tt3748528", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg" }, { "Title": "Star Wars: The Last Jedi", "Year": "2017", "imdbID": "tt2527336", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg" }, { "Title": "Solo: A Star Wars Story", "Year": "2018", "imdbID": "tt3778644", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BOTM2NTI3NTc3Nl5BMl5BanBnXkFtZTgwNzM1OTQyNTM@._V1_SX300.jpg" } ]
    };
    */
    return { 
      query: context.query.query,
      movies: context.req.maData.apiResult.Search
    };
  }
}
</script>

<style scoped>
#search-title {
  padding: 20px;
}
section .container {
  padding: 20px;
}
.movie-list-single {
  background-color: white;
  margin-bottom: 3px;
}
.media {
  align-items: center;
}
.media-left {
  overflow: hidden;
}
</style>
