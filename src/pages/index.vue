<template>
  <div>
    <section class="hero is-medium">
      <div id="newesrQuoteHero" :style="{backgroundImage: `url('${newestQuote.movie.Poster}')`}" class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ newestQuote.quote.content }}
          </h1>
          <h2 class="subtitle">
            Primary bold subtitle
          </h2>
        </div>
      </div>
    </section>
    <div class="container">
      {{ newestQuote }}
      <div class="field">
        <form action="/search" method="get">
          <div class="control">
            <input class="input is-rounded" type="text" name="query" placeholder="Normal input">
          </div>
          <div class="control">
            <input type="submit" class="button is-primary" placeholder="Normal input" >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    // localhost:3000用
    if (context.req.maData === undefined) {
      return {
        newestQuote: {
          quote: {
            content: "sample"
          },
          movie: {
            Poster:
              "https://t2.genius.com/unsafe/0x1300/https%3A%2F%2Fimages.genius.com%2F9c584b7a15a9a02ee3cb61b089706d74.1080x1080x1.jpg"
          }
        }
      }
    }
    return { newestQuote: context.req.maData.newestQuote }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
#newesrQuoteHero {
  background-size: cover;
  background-position: center;
}
</style>
