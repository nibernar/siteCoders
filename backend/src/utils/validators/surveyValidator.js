const { body } = require('express-validator');

exports.validateSurvey = [
  body('email').notEmpty().withMessage('L\'adresse email est requise').isEmail().withMessage('L\'adresse email est invalide').normalizeEmail(),
  body('age').notEmpty().withMessage('L\'âge est requis').isString().trim().escape(),
  body('current_status').notEmpty().withMessage('Le statut actuel est requis').isString().trim().escape(),
  body('project_stage').notEmpty().withMessage('L\'étape du projet est requise').isString().trim().escape(),
  body('tool_type').notEmpty().withMessage('Le type d\'outil est requis').isString().trim().escape(),
  body('main_goal').notEmpty().withMessage('L\'objectif principal est requis').isString().trim().escape(),
  body('used_nocode').isBoolean().withMessage('La réponse concernant le No-code doit être un booléen'),
  body('nocode_abandon_reason').optional({ nullable: true }).isString().trim().escape(),
  body('priorities_ranking').isArray().withMessage('Le classement des priorités doit être un tableau'),
  body('ai_expectations').isArray().withMessage('Les attentes de l\'IA doivent être un tableau'),
  body('ideal_price').notEmpty().withMessage('Le prix idéal est requis').isNumeric().withMessage('Le prix idéal doit être un nombre').trim(),
  body('ai_prompt').notEmpty().withMessage('Le prompt IA est requis').isString().trim().escape(),
  body('technical_limits').notEmpty().withMessage('Les limites techniques sont requises').isString().trim().escape(),
  body('current_blockage').isInt({ min: 1, max: 10 }).withMessage('Le blocage actuel doit être entre 1 et 10'),
  body('fixed_logic').isInt({ min: 1, max: 10 }).withMessage('La logique figée doit être entre 1 et 10'),
  body('urgency').isInt({ min: 1, max: 10 }).withMessage('L\'urgence doit être entre 1 et 10'),
  body('external_pressure').isInt({ min: 1, max: 10 }).withMessage('L\'imposition extérieure doit être entre 1 et 10'),
  body('current_solutions_inadequacy').isInt({ min: 1, max: 10 }).withMessage('L\'inadéquation des solutions doit être entre 1 et 10'),
  body('strategic_importance').isInt({ min: 1, max: 10 }).withMessage('L\'importance stratégique doit être entre 1 et 10')
];
