const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  pictures: [String],
  price: Number,
});

module.exports = mongoose.model('Product', productSchema);
