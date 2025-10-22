const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/'); },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname); }
});
const upload = multer({ storage });

router.post('/assignments', auth, roles(['teacher']), upload.single('file'), teacherController.createAssignment);
router.get('/assignments', auth, roles(['teacher','admin']), teacherController.listAssignments);

router.post('/notes', auth, roles(['teacher']), upload.single('file'), teacherController.createNote);
router.get('/notes', auth, roles(['teacher','admin']), teacherController.listNotes);

router.post('/pastpapers', auth, roles(['teacher']), upload.single('file'), teacherController.createPastPaper);
router.get('/pastpapers', auth, roles(['teacher','admin']), teacherController.listPastPapers);

router.post('/results', auth, roles(['teacher']), upload.single('file'), teacherController.uploadResult);

module.exports = router;
