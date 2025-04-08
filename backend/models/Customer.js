const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
}, {
  timestamps: true 
});

module.exports = mongoose.model('Customer', customerSchema);

