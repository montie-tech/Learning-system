const Assignment = require('../models/Assignment');
const Note = require('../models/Note');
const PastPaper = require('../models/PastPaper');
const Submission = require('../models/Submission');

exports.getMaterials = async (req, res) => {
  try {
    // optionally filter by subject/class via query
    const { subject } = req.query;
    const notes = subject ? await Note.find({ subject }) : await Note.find();
    const papers = subject ? await PastPaper.find({ subject }) : await PastPaper.find();
    res.json({ notes, papers });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAssignments = async (req, res) => {
  try {
    const { subject } = req.query;
    const q = subject ? { subject } : {};
    const assignments = await Assignment.find(q).sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { comment, course } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const submission = await Submission.create({
      assignment: assignmentId,
      student: req.user._id,
      fileUrl,
      comment,
      course
    });
    res.json({ success: true, submission });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listSubmissions = async (req, res) => {
  try {
    const subs = await Submission.find({ student: req.user._id }).populate('assignment').lean();
    res.json(subs);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
