require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);
  const adminExists = await User.findOne({ email: 'admin@nexus.com' });
  if (!adminExists) {
    const hash = await bcrypt.hash('admin123', 10);
    await User.create({ name: 'Admin', email: 'admin@nexus.com', passwordHash: hash, role: 'admin' });
    console.log('Created admin');
  }
  const teacherExists = await User.findOne({ email: 'teacher@nexus.com' });
  if (!teacherExists) {
    const hash = await bcrypt.hash('teach123', 10);
    await User.create({ name: 'Teacher', email: 'teacher@nexus.com', passwordHash: hash, role: 'teacher' });
    console.log('Created teacher');
  }
  mongoose.disconnect();
}
seed();
