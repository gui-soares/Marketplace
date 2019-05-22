const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Ad = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

Ad.plugin(mongoosePaginate)

module.exports = mongoose.model('Ad', Ad)
