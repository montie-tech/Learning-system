const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: Date,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', assignmentSchema);

