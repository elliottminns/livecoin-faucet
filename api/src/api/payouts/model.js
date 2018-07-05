const mongoose = require('mongoose')

const PayoutSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  roll: {
    type: Number,
    required: true
  },
  txid: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Payout = mongoose.model('Payout', PayoutSchema)

module.exports = Payout
