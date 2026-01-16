const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['dresses', 'sarees', 'tops', 'other'],
  },
  images: [{
    type: String,
  }],
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'],
  }],
  colors: [{
    type: String,
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
