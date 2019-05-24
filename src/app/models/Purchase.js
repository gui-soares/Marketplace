const mongoose = require('mongoose')
const mongoosePaginte = require('mongoose-paginate-v2')

const Purchase = new mongoose.Schema({
  ad: {
    type: mongoose.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

Purchase.plugin(mongoosePaginte)

module.exports = mongoose.model('Purchase', Purchase)
