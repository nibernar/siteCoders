const { body } = require('express-validator');

// Nous retirons la vérification d'unicité du validateur
// et la gérons directement dans le contrôleur pour un meilleur formatage des erreurs
exports.validateContactCreation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Le nom est requis')
    .isLength({ max: 255 }).withMessage('Le nom ne doit pas dépasser 255 caractères'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('L\'email est requis')
    .isEmail().withMessage('Format d\'email invalide')
    .isLength({ max: 255 }).withMessage('L\'email ne doit pas dépasser 255 caractères'),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Le message est requis'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('Le nom de la société ne doit pas dépasser 255 caractères')
];
