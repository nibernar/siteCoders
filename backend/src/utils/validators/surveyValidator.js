const { body } = require('express-validator');

exports.validateSurvey = [
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('age').notEmpty().isString().trim(),
  body('current_status').notEmpty().isString().trim(),
  body('project_stage').notEmpty().isString().trim(),
  body('tool_type').notEmpty().isString().trim(),
  body('main_goal').notEmpty().isString().trim(),
  body('used_nocode').isBoolean(),
  body('nocode_abandon_reason').optional({ nullable: true }).isString().trim(),
  body('priorities_ranking').isArray(),
  body('ai_expectations').isArray(),
  body('ideal_price').notEmpty().isNumeric().trim(),
  body('ai_prompt').notEmpty().isString().trim(),
  body('technical_limits').notEmpty().isString().trim(),
  body('current_blockage').isInt({ min: 1, max: 10 }),
  body('fixed_logic').isInt({ min: 1, max: 10 }),
  body('urgency').isInt({ min: 1, max: 10 }),
  body('external_pressure').isInt({ min: 1, max: 10 }),
  body('current_solutions_inadequacy').isInt({ min: 1, max: 10 }),
  body('strategic_importance').isInt({ min: 1, max: 10 })
];
