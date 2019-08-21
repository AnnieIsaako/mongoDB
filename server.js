const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

const allProducts = require('./data/products');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function(req, res){
    res.send('Welcome to our Products API. Use endpoints to filter out the data');
});

app.get('/allProducts', function(req, res) {
  res.send(allProducts);
});

app.get('/product/:id', function(req, res) {
  let product;
  const productIdParam = req.params.id;
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].id == productIdParam) {
      product = allProducts[i];
      break;
    }
  }
  res.send(product);
});

app.get('/product/edit/:id', function(req, res) {
  let product;
  const productEditId = req.params.id;
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].id == productEditId) {
      product = allProducts[i];
      break;
    }
  }
  res.send(product);
});

app.get('/product/delete/:id', function(req, res) {
  let product;
  const productDeleteId = req.params.id;
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].id == productDeleteId) {
      product = allProducts[i];
      break;
    }
  }
  res.send(product);
});

app.post('/product', function(req, res) {
  // console.log('there is a post request');
  let product = {
    name: req.body.name,
    price: req.body.price,
    message: 'We are about to send this product to a database'
  }
  res.send(product);
});

app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`)
});
