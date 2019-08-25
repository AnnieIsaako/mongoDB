const mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({ // name columns
  fName: String,
  lName: String,
  email: String
});


module.exports = mongoose.model('Contacts', contactSchema); // export it
