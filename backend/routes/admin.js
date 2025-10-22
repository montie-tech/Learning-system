const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/overview', auth, roles(['admin']), adminController.overview);

// classlist upload (xlsx/csv)
router.post('/upload-classlist', auth, roles(['admin']), upload.single('file'), adminController.uploadClasslist);

// users management
router.get('/users', auth, roles(['admin']), adminController.listUsers);
router.post('/users', auth, roles(['admin']), adminController.createUser);
router.put('/users/:id', auth, roles(['admin']), adminController.updateUser);
router.delete('/users/:id', auth, roles(['admin']), adminController.deleteUser);

// payments
router.get('/payments', auth, roles(['admin']), adminController.listPayments);
router.post('/payments', auth, roles(['admin']), adminController.addPayment);
router.put('/payments/:id', auth, roles(['admin']), adminController.updatePayment);

// report export (csv)
router.get('/export/users', auth, roles(['admin']), adminController.exportUsersCSV);

module.exports = router;
