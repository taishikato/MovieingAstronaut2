const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Nuxt } = require('nuxt');
const express = require('express');
const axios = require('axios');

const app = express();

admin.initializeApp();
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const config = {
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/'
  }
};

const nuxt = new Nuxt(config);

app.get('/', (req, res) => {
  (async () => {
    // firestoreからセリフ情報を1件取得
    const quotesData = await firestore.collection('quotes').orderBy('created', 'desc').limit(1).get();
    let quote;
    quotesData.forEach(quoteData => {
      quote = quoteData.data();
    });
    // Movie情報取得
    const { data } = await axios.get(`https://www.omdbapi.com/?i=${quote.movieId}&apikey=1b46575f`);
    const newestQuote = {
      quote,
      movie: data,
    };

    req.maData = {};
    req.maData.newestQuote = newestQuote;
    const result = await nuxt.renderRoute('/', { req });
    res.send(result.html);
  })();
});

app.get('/search', (req, res) => {
  (async () => {
    const query = req.query.query;
    const { data } = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=1b46575f`);
    req.maData = {};
    req.maData = {
      apiResult: data,
      query
    };
    nuxt.renderRoute(`/search/${query}`, { req })
    .then(result => {
      res.send(result.html);
    })
    .catch(e => {
      res.send(e);
    });
  })();
});

app.get('/detail/:movie_id', (req, res) => {
  const movieId = req.params.movie_id;
  (async () => {
    const { data } = await axios.get(`https://www.omdbapi.com/?i=${movieId}&apikey=1b46575f`);
    req.maData = {};
    req.maData.apiResult = data;
    nuxt.renderRoute(`/detail/${movieId}`, { req })
    .then(result => {
      res.send(result.html);
    })
    .catch(e => {
      res.send(e);
    });
  })();
});

app.get('/quote/add/:movie_id', (req, res) => {
  const movieId = req.params.movie_id;
  (async () => {
    const { data } = await axios.get(`https://www.omdbapi.com/?i=${movieId}&apikey=1b46575f`);
    req.maData = {};
    req.maData.apiResult = data;
    const result = await nuxt.renderRoute(`/quote/add/${movieId}`, { req })
    res.send(result.html);
  })();
});

app.get('/u/:user_id', (req, res) => {
  (async () => {
    const userId = req.params.user_id;
    // firestoreからユーザ情報を取得
    const userData = await firestore.collection('users').doc(userId).get();
    req.maData = {};
    req.maData.userData = userData.data();
    const result = await nuxt.renderRoute(`/u/${userId}`, { req })
    res.send(result.html);
  })();
});


exports.ssrapp = functions.https.onRequest(app);
