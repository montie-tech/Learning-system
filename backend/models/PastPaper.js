const mongoose = require('mongoose');

const pastPaperSchema = new mongoose.Schema({
  title: String,
  subject: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PastPaper', pastPaperSchema);
