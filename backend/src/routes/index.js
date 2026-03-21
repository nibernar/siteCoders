const express = require('express');
const router = express.Router();
const { contactController, authController } = require('../controllers');
const { validators } = require('../utils');
const { base } = require('../middleware');
const { verifyToken, optionalAuth } = require('../middleware/auth');

// Route publique pour l authentification (si necessaire)
router.post('/auth/login', authController.login);
router.post('/auth/api-token', verifyToken, authController.createApiToken);

// Route de contact avec authentification optionnelle
router.post(
  '/contact',
  optionalAuth,
  validators.contactValidator.validateContactCreation,
  base.dataValidation.handleValidationErrors,
  contactController.createContact
);

// Routes protegees
router.get(
  '/contacts',
  verifyToken,
  contactController.getContacts
);

const surveyRoutes = require('./surveyRoutes');
router.use('/survey', surveyRoutes);

module.exports = router;
