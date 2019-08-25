const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // allows us to connect to mongoDB

const config = require('./config'); // gets password of dbuser

const Product = require('./models/products');
mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@anniescluster-qrhsv.mongodb.net/shop?retryWrites=true&w=majority`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected
  console.log('we\'re connected to mongo db');
});

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
  // res.send(allProducts);
  Product.find().then(result => {
    res.send(result);
  })
});

app.get('/product/:id', function(req, res) {
  const id = req.params.id
  // let product;
  // const productIdParam = req.params.id;
  // for (var i = 0; i < allProducts.length; i++) {
  //   if (allProducts[i].id == productIdParam) {
  //     product = allProducts[i];
  //     break;
  //   }
  // }
  // res.send(product);
  Product.findById(id).then(result => {
    res.send(result);
  })
});

app.get('/product/edit/:_id', function(req, res) {
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
  // let product = {
  //   name: req.body.name,
  //   price: req.body.price,
  //   message: 'We are about to send this product to a database'
  // }
  // res.send(product);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(), // creates a unique key
    name: req.body.name,
    price: req.body.price
  });
  product.save().then(result => {
    res.send(result);
  })
  .catch(err => res.send(err));
});

// make a new MODEL
const Contact = require('./models/contact');

app.post('/contact', function(req, res) {
  const contact = new Contact ({
    _id: new mongoose.Types.ObjectId(),
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email
  })
  contact.save().then(result => {
    res.send(result);
  })
})

const Feedback = require('./models/feedback');

app.post('/feedback', function(req, res) {
  const feedback = new Feedback ({
    _id: new mongoose.Types.ObjectId(),
    shopName: req.body.shopName,
    suburb: req.body.suburb,
    postalCode: req.body.postalCode,
    message: req.body.message,
  })
  contact.save().then(result => {
    res.send(result);
  })
  // console.log(feedback);
})



app.listen(port, () => {
    // console.clear();
    console.log(`application is running on port ${port}`)
});
