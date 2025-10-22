const Assignment = require('../models/Assignment');
const Note = require('../models/Note');
const PastPaper = require('../models/PastPaper');
const Result = require('../models/Result');
const sendMail = require('../utils/sendEmail');

exports.createAssignment = async (req, res) => {
  try {
    const { title, description, subject, dueDate } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const a = await Assignment.create({
      title, description, subject, teacher: req.user._id, dueDate, fileUrl
    });
    res.json({ success: true, assignment: a });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('teacher','name email').sort({ createdAt: -1 }).lean();
    res.json(assignments);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createNote = async (req, res) => {
  try {
    const { title, description, subject } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const n = await Note.create({ title, description, subject, teacher: req.user._id, fileUrl });
    res.json({ success: true, note: n });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate('teacher','name email').sort({ createdAt: -1 }).lean();
    res.json(notes);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createPastPaper = async (req, res) => {
  try {
    const { title, subject } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const p = await PastPaper.create({ title, subject, teacher: req.user._id, fileUrl });
    res.json({ success: true, pastpaper: p });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listPastPapers = async (req, res) => {
  try {
    const papers = await PastPaper.find().populate('teacher','name email').sort({ createdAt: -1 }).lean();
    res.json(papers);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.uploadResult = async (req, res) => {
  try {
    const { title, className, emails } = req.body; // emails expected as comma-separated string
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const emailList = emails ? emails.split(',').map(e => e.trim()).filter(Boolean) : [];
    const r = await Result.create({ title, className, teacher: req.user._id, fileUrl, emailsSentTo: emailList });
    // send emails (attachments)
    if (emailList.length) {
      await sendMail(emailList.join(','), `Result Slip - ${title}`, `Dear parent/student,\nPlease find the result slip attached.`, [
        { filename: req.file.originalname, path: req.file.path }
      ]);
    }
    res.json({ success: true, result: r });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
