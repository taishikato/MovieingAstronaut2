const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');

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
  // res.set('Cache-Control', 'public, max-age=600, s-maxage-1200');
  // add variables to req to use them in Nuxt component
  nuxt.renderRoute('/', { req })
  .then(result => {
    res.send(result.html);
  })
  .catch(e => {
    res.send(e);
  });
});

app.get('/api', (req, res) => {
  nuxt.renderRoute('/api', { req })
  .then(result => {
    res.send(result.html);
  })
  .catch(e => {
    res.send(e);
  });
});


exports.ssrapp = functions.https.onRequest(app);
