const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  status: { type: String, enum: ['placed', 'shipped', 'delivered', 'cancelled'], default: 'placed' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
