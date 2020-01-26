const mongoose = require('mongoose')

const Report = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  q1: Number,
  q2: Number,
  q3: Number,
  q4: Number,
  files: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "File"
  }],
  observ: String
}, {
  timestamps: true
})
module.exports = mongoose.model("Report", Report)