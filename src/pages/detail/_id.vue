<template>
  <div id="detail-id">
    <section :style="{backgroundImage: `url('${movie.Poster}')`}" class="hero">
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
          <button v-if="addingQuote === false" class="button is-light" @click="startAddingQuote">Add Quote</button>
          <button v-if="addingQuote" :disabled="isSaving || addingQuoteCount === 0" class="button" @click="addQuote">Add</button>
          <button v-if="addingQuote" class="button is-danger is-inverted" @click="cancelAddingQuote">Cancel</button>
          <div v-if="finishAdding" class="notification is-success" style="margin-top: 5px;">
            Success To Add Your Post!
          </div>
          <div v-if="addingQuote" id="addTextArea" class="control">
            <textarea v-model="quote" class="textarea" type="text" placeholder="Quote"/>
          </div>
        </div>
        <!-- <cube-shadow v-show="isLoading" class="loadingSpinner"></cube-shadow> -->
        <div v-show="isLoading" class="has-text-centered">
          <i class="fas fa-spinner fa-spin fa-3x"/>
        </div>
        <div v-show="isLoading === false && noQuote" class="has-text-centered">
          No Quote
        </div>
        <ul v-show="isLoading === false" id="quote-list">
          <li v-for="quote in quotes" :key="quote.quoteId">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong><a :href="`/u/${quote.user.userId}`">{{ quote.user.displayName }}</a></strong>
                    <br>
                    {{ quote.quote.content }}
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a v-if="quote.isLiked" class="level-item likedQuote" @click.prevent="dislikeQuote(quote)">
                      <span class="icon is-small"><i class="fas fa-heart"/></span>
                    </a>
                    <a v-else class="level-item" @click.prevent="likeQuote(quote)">
                      <span class="icon is-small"><i class="fas fa-heart"/></span>
                    </a>
                    &nbsp;<small>{{ $moment.unix(quote.quote.created).format('YYYY/MM/DD H:mm:ss') }}</small>
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
/* eslint-disable no-unused-vars */

import firebase from "~/plugins/firebase"
// Use firestore
import "firebase/firestore"
const firestore = firebase.firestore()

// Plugins
import addData from "~/plugins/addData"
import getUser from "~/plugins/getUser"

// Refs
const quotesRef = firestore.collection("quotes")
const likeQuoteRef = firestore.collection("likeQuotesByUser")

const getUnixTime = () => {
  const date = new Date()
  return Math.floor(date.getTime() / 1000)
}

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export default {
  async asyncData(context) {
    /*
    return {
      movie: {
        Title: "Reign Over Me",
        Year: "2007",
        Rated: "R",
        Released: "23 Mar 2007",
        Runtime: "124 min",
        Genre: "Drama",
        Director: "Mike Binder",
        Writer: "Mike Binder",
        Actors: "Adam Sandler, Don Cheadle, Jada Pinkett Smith, Liv Tyler",
        Plot:
          "A man who lost his family in the September 11 attack on New York City runs into his old college roommate. Rekindling the friendship is the one thing that appears able to help the man recover from his grief.",
        Language: "English",
        Country: "USA",
        Awards: "3 nominations.",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BOTYyMTExNTgwNF5BMl5BanBnXkFtZTcwMDY4MTEzMw@@._V1_SX300.jpg",
        Ratings: [
          { Source: "Internet Movie Database", Value: "7.5/10" },
          { Source: "Rotten Tomatoes", Value: "64%" },
          { Source: "Metacritic", Value: "61/100" }
        ],
        Metascore: "61",
        imdbRating: "7.5",
        imdbVotes: "88,683",
        imdbID: "tt0490204",
        Type: "movie",
        DVD: "09 Oct 2007",
        BoxOffice: "&pound;19,661,987",
        Production: "Sony Pictures",
        Website: "http://www.sonypictures.com/movies/reignoverme/index.html",
        Response: "True"
      }
    }
    */
    return { movie: context.req.maData.apiResult }
  },
  data() {
    return {
      addingQuote: false,
      quote: "",
      isSaving: false,
      finishAdding: false,
      quotesByMovieRef: "",
      quotes: [],
      isLoading: true,
      noQuote: false
    }
  },
  computed: {
    addingQuoteCount() {
      return this.quote.length
    }
  },
  async created() {
    // サブコレクションリファレンス作成
    const movieId = this.$route.params.id
    this.quotesByMovieRef = firestore
      .collection("quotesByMovie")
      .doc(movieId)
      .collection("quotes")

    // この映画のセリフを取得
    const firestoreQuotes = await this.quotesByMovieRef
      .orderBy("created", "desc")
      .get()
    if (firestoreQuotes.empty === true) {
      this.noQuote = true
      this.isLoading = false
      return
    }
    await asyncForEach(firestoreQuotes.docs, async quote => {
      const quoteData = quote.data()
      const quoteId = quote.id
      quoteData.quoteId = quoteId
      const quoteUser = await getUser(
        firestore.collection("users").doc(quoteData.userId)
      )
      // いいねしてるかどうか調べる
      const isLikedSnapshot = await likeQuoteRef
        .doc(this.$store.getters.getUserInfo.userId)
        .collection("quotes")
        .where("quoteId", "==", quoteId)
        .get()
      let isLiked = false
      let likedId = null
      if (isLikedSnapshot.empty !== true) {
        isLiked = true
        isLikedSnapshot.forEach(isLiked => {
          likedId = isLiked.id
        })
      }
      // 最終的なデータ
      this.quotes.push({
        isLiked,
        likedId,
        quote: quoteData,
        user: quoteUser.data()
      })
    })

    this.isLoading = false
  },
  methods: {
    startAddingQuote() {
      this.addingQuote = true
    },
    cancelAddingQuote() {
      this.addingQuote = false
    },
    async addQuote() {
      this.isSaving = true
      const addDataSet = {
        content: this.quote,
        movieId: this.$nuxt.$route.params.id,
        userId: this.$store.getters.getUserInfo.userId,
        created: getUnixTime()
      }
      await Promise.all([
        addData(quotesRef, addDataSet),
        addData(this.quotesByMovieRef, addDataSet)
      ])
      this.isSaving = false
      this.finishAdding = true
    },
    async likeQuote(quote) {
      quote.isLiked = true
      const saveData = {
        quoteId: quote.quote.quoteId
      }
      await addData(
        likeQuoteRef
          .doc(this.$store.getters.getUserInfo.userId)
          .collection("quotes"),
        saveData
      )
    },
    async dislikeQuote(quote) {
      quote.isLiked = false
      await likeQuoteRef
        .doc(this.$store.getters.getUserInfo.userId)
        .collection("quotes")
        .doc(quote.likedId)
        .delete()
    }
  }
}
</script>

<style scoped>
.hero {
  background-size: cover;
  background-position: center;
}
.hero-body {
  background-color: rgba(0, 0, 0, 0.6);
}
.section {
  padding-top: 0;
}
.hero-body .column .title,
.hero-body .column .subtitle {
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
.loadingSpinner {
  margin: auto;
}
.likedQuote {
  color: red;
}
</style>
