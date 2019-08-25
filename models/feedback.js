const mongoose = require('mongoose');

var feedbackSchema = new mongoose.Schema({ // name columns
  shopName: String,
  suburb: String,
  postalCode: Number,
  message: String
});


module.exports = mongoose.model('Feedback', feedbackSchema); // export it
