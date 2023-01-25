const express = require('express');
const ejs = require('ejs');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();
const router = express.Router();
const products = require('../data');
app.use(cors())

app.set('view engine', 'ejs');

router.get('/test', cors(), (req, res) => {
  res.json(
    [{
      'id': '001',
      'name': 'Smith',
      'email': 'smith@gmail.com'
    },
      {
        'id': '002',
        'name': 'Sam',
        'email': 'sam@gmail.com'
      },
      {
        'id': '003',
        'name': 'lily',
        'email': 'lily@gmail.com'
      }]
  )
})

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
  res.render('index.ejs', {
    data
  });
});

router.get('/product/:productName', (req, res) => {
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