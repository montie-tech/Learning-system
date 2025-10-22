const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/materials', auth, roles(['student']), studentController.getMaterials);
router.get('/assignments', auth, roles(['student']), studentController.getAssignments);

router.post('/submit/:assignmentId', auth, roles(['student']), upload.single('file'), studentController.submitAssignment);

router.get('/submissions', auth, roles(['student']), studentController.listSubmissions);

module.exports = router;
