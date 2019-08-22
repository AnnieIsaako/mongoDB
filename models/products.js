const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({ // name columns
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
});


module.exports = mongoose.model('Product', productSchema); // export it
