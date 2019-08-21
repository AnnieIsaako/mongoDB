const express = require('express');
const app = express();
const port = 3000;

const allProducts = require('./data/products');

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
  // res.send(productIdParam);
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
  // res.send(productIdParam);
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
  // res.send(productIdParam);
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].id == productDeleteId) {
      product = allProducts[i];
      break;
    }
  }
  res.send(product);
});


app.listen(port, () => {
    // console.clear();
    console.log(`application is running on port ${port}`)
});
