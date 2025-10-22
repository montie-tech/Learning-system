const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/list', (req, res) => {
  const dir = path.join(__dirname, '../uploads');
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(files);
  });
});

module.exports = router;
