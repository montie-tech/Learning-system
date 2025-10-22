const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
