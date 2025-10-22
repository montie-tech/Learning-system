const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl: String,
  comment: String,
  course: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
