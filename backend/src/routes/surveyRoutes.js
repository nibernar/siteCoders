const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');
const { validateSurvey } = require('../utils/validators/surveyValidator');

// POST /api/survey
router.post('/', validateSurvey, surveyController.submitSurvey);

module.exports = router;
