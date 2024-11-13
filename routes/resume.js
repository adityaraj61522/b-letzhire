const express = require('express');
const { createResume,updateResume } = require('../controller/resumeController');
const { auth } = require('../middlewares/auth');
// const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/create-resume',auth ,createResume);
router.post('/update-resume', updateResume);

module.exports = router;
