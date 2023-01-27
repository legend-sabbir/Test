const express = require('express');
const ejs = require('ejs');
const serverless = require('serverless-http');
const path = require('path');
const app = express();
const router = express.Router();
const products = require('../../data');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

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


app.get('/:productName', (req, res) => {
  const productName = req.params.productName;
  const product = products.get(productName);
  if (!product) {
    console.log(`Product ${productName} not found.`);
    res.send("Product not found");
  } else {
    res.render('product', { product });
  }
});



app.use('/', router);
module.exports.handler = serverless(app);