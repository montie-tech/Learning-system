const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  title: String,
  className: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl: String,
  emailsSentTo: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
