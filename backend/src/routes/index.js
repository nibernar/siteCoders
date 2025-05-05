const express = require('express');
const router = express.Router();
const { contactController, authController } = require('../controllers');
const { validators } = require('../utils');
const { base } = require('../middleware');
const { verifyToken, optionalAuth } = require('../middleware/auth');

// Route publique pour l'authentification (si nécessaire)
router.post('/auth/login', authController.login);
router.post('/auth/api-token', verifyToken, authController.createApiToken);

// Route de contact avec authentification optionnelle
// L'authentification n'est pas obligatoire mais si un token est fourni, il sera vérifié
router.post(
  '/contact',
  optionalAuth, // Authentification optionnelle
  validators.contactValidator.validateContactCreation,
  base.dataValidation.handleValidationErrors,
  contactController.createContact
);

// Routes protégées (si vous avez besoin d'accéder aux contacts)
router.get(
  '/contacts',
  verifyToken,
  contactController.getContacts // Vous devrez implémenter cette fonction
);

module.exports = router;