const express = require('express');
const { createResume, updateResume } = require('../controller/resumeController');
const { auth } = require('../middlewares/auth');
// const auth = require('../middlewares/auth');
const uploadResumeController = require('../controller/uploadResumeController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/create-resume', auth, createResume);
router.post('/update-resume', updateResume);

router.post('/uploadResumes', upload.single('file'), uploadResumeController.uploadResumes);

module.exports = router;
