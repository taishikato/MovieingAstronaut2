const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');
const axios = require('axios');

const app = express();

const config = {
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/'
  }
};

const nuxt = new Nuxt(config);

app.get('/', (req, res) => {
  nuxt.renderRoute('/', { req })
  .then(result => {
    res.send(result.html);
  })
  .catch(e => {
    res.send(e);
  });
});

app.get('/api', (req, res) => {
  (async () => {
    const { data } = await axios.get('https://www.omdbapi.com/?s=star wars&apikey=1b46575f');
    req.maData = {};
    req.maData.apiResult = data;
    nuxt.renderRoute('/api', { req })
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


exports.ssrapp = functions.https.onRequest(app);
