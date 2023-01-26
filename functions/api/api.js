const express = require('express');
const ejs = require('ejs');
const serverless = require('serverless-http');
const path = require('path');
const app = express();
const router = express.Router();
const products = require('../../data');

app.set('view engine', 'ejs');

router.get('/', (req, res) => {
  const page = req.query.page || 1;
  const perPage = 20;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  const data = [...products.values()].sort((a, b) => {
    const first = +a.price?.replace(/[,.]/g, "")
    const last = +b.price?.replace(/[,.]/g, "")

    return last - first
  }).slice(startIndex, endIndex);
  res.render('index', {
    data
  });
});

/*
router.get('/', (req, res) => {
  res.send("hello")
})*/
router.get('/test', (req, res) => {
  res.send("test")
})
router.get('/:aa', (req, res) => {
  res.send(req.params.aa)
})

app.use('/', router);
module.exports.handler = serverless(app);