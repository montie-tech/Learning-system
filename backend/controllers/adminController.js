const User = require('../models/User');
const Payment = require('../models/Payment');
const fs = require('fs');
const XLSX = require('xlsx');
const path = require('path');
const bcrypt = require('bcryptjs');
const { Parser } = require('json2csv');

exports.overview = async (req, res) => {
  try {
    const teachers = await User.countDocuments({ role: 'teacher' });
    const students = await User.countDocuments({ role: 'student' });
    const classes = await User.distinct('className', { role: 'student' });
    const pendingPayments = await Payment.countDocuments({ status: 'Pending' });
    res.json({ teachers, students, classes: classes.length, pendingPayments });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.uploadClasslist = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const wb = XLSX.readFile(req.file.path);
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);
    const created = [];
    for (const r of rows) {
      const email = r['Email'] || r['email'];
      if (!email) continue;
      const exists = await User.findOne({ email });
      if (exists) continue;
      const tempPassword = Math.random().toString(36).slice(2,10);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(tempPassword, salt);
      const user = await User.create({
        name: r['Full Name'] || r['Name'] || '',
        email,
        passwordHash: hash,
        role: 'student',
        className: r['Class'] || '',
        admissionNo: r['Admission No'] || r['Admission'] || '',
        gender: r['Gender'] || ''
      });
      created.push({ email: user.email, password: tempPassword });
    }
    fs.unlinkSync(req.file.path);
    res.json({ success: true, created });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash').lean();
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, className, admissionNo, gender } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email exists' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, passwordHash: hash, role, className, admissionNo, gender });
    res.json({ success: true, user: { id: user._id, email: user.email, role: user.role }});
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.passwordHash = await bcrypt.hash(updates.password, salt);
      delete updates.password;
    }
    await User.findByIdAndUpdate(req.params.id, updates);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.listPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('student').lean();
    res.json(payments);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.addPayment = async (req, res) => {
  try {
    const { studentId, studentName, className, amount, status } = req.body;
    const p = await Payment.create({ student: studentId, studentName, className, amount, status: status || 'Pending' });
    res.json({ success: true, payment: p });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updatePayment = async (req, res) => {
  try {
    await Payment.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.exportUsersCSV = async (req, res) => {
  try {
    const users = await User.find().lean();
    const fields = ['admissionNo','name','email','role','className','gender'];
    const parser = new Parser({ fields });
    const csv = parser.parse(users);
    res.header('Content-Type', 'text/csv');
    res.attachment('users_report.csv');
    res.send(csv);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
