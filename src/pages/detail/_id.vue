<template>
  <div id="detail-id">
    <section class="hero" :style="{backgroundImage: `url('${movie.Poster}')`}">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <figure class="image is-2by3">
                <img :src="movie.Poster" width="150">
              </figure>
            </div>
            <div class="column">
              <h1 class="title">
                {{ movie.Title }}
              </h1>
              <h2 class="title is-5">
                Actors: {{ movie.Actors }}
              </h2>
              <h3 class="title is-6">
                Released: {{ movie.Released }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div id="quote-container" class="container">
        <div>
          <button v-if="addingQuote === false" @click="startAddingQuote" class="button is-light">Add Quote</button>
          <button v-if="addingQuote" @click="addQuote" :disabled="isSaving || addingQuoteCount === 0" class="button">Add</button>
          <button v-if="addingQuote" @click="cancelAddingQuote" class="button is-danger is-inverted">Cancel</button>
          <div v-if="finishAdding" class="notification is-success" style="margin-top: 5px;">
            Success To Add Your Post!
          </div>
          <div v-if="addingQuote" id="addTextArea" class="control">
            <textarea v-model="quote" class="textarea" type="text" placeholder="Quote"></textarea>
          </div>
        </div>
        <ul id="quote-list">
          <li>
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>@John Smith</strong>&nbsp;<small>31m</small>
                    <br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item">
                      <span class="icon is-small"><i class="fas fa-heart"></i></span>
                    </a>
                  </div>
                </nav>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>
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
  async asyncData(context) {
    /*
    return {
      movie: {"Title": "Reign Over Me", "Year": "2007", "Rated": "R", "Released": "23 Mar 2007", "Runtime": "124 min", "Genre": "Drama", "Director": "Mike Binder", "Writer": "Mike Binder", "Actors": "Adam Sandler, Don Cheadle, Jada Pinkett Smith, Liv Tyler", "Plot": "A man who lost his family in the September 11 attack on New York City runs into his old college roommate. Rekindling the friendship is the one thing that appears able to help the man recover from his grief.", "Language": "English", "Country": "USA", "Awards": "3 nominations.", "Poster": "https://m.media-amazon.com/images/M/MV5BOTYyMTExNTgwNF5BMl5BanBnXkFtZTcwMDY4MTEzMw@@._V1_SX300.jpg", "Ratings": [ { "Source": "Internet Movie Database", "Value": "7.5/10" }, { "Source": "Rotten Tomatoes", "Value": "64%" }, { "Source": "Metacritic", "Value": "61/100" } ], "Metascore": "61", "imdbRating": "7.5", "imdbVotes": "88,683", "imdbID": "tt0490204", "Type": "movie", "DVD": "09 Oct 2007", "BoxOffice": "&pound;19,661,987", "Production": "Sony Pictures", "Website": "http://www.sonypictures.com/movies/reignoverme/index.html", "Response": "True"}
    };
    */
    return { movie: context.req.maData.apiResult };
  },
  data() {
    return {
      addingQuote: false,
      quote: '',
      isSaving: false,
      finishAdding: false,
    }
  },
  computed: {
    addingQuoteCount() {
      return this.quote.length;
    }
  },
  methods: {
    startAddingQuote() {
      this.addingQuote = true;
    },
    cancelAddingQuote() {
      this.addingQuote = false;
    },
    async addQuote() {
      this.isSaving = true;
      const addDataSet = {
        content: this.quote,
        movieId: this.$nuxt.$route.params.id,
        userId: this.$store.getters.getUserInfo.userId,
        created: getUnixTime(),
      };
      await addData(quotesRef, addDataSet);
      this.isSaving = false;
      this.finishAdding = true;
      console.log('Success');
    },
  }
}
</script>

<style scoped>
.hero {
  background-size: cover;
  background-position: center;
}
.hero-body {
  background-color: rgba(0,0,0,0.6);
}
.section {
  padding-top: 0;
}
.hero-body .column .title, .hero-body .column .subtitle {
  color: aliceblue;
}
#quote-container {
  padding: 20px;
  background-color: white;
}
#quote-list {
  margin-top: 30px;
}
#addTextArea {
  margin-top: 10px;
}
</style>
