const { SurveyResponse } = require('../models');
const { validationResult } = require('express-validator');
const { sendDiscordLeadAlert } = require('../utils/discord');

exports.submitSurvey = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      email, age, current_status, project_stage, tool_type, main_goal, used_nocode,
      nocode_abandon_reason, priorities_ranking, ai_expectations,
      ideal_price, ai_prompt, technical_limits, current_blockage,
      fixed_logic, urgency, external_pressure, current_solutions_inadequacy,
      strategic_importance
    } = req.body;

    const newResponse = await SurveyResponse.create({
      email, age, current_status, project_stage, tool_type, main_goal, used_nocode,
      nocode_abandon_reason, priorities_ranking, ai_expectations,
      ideal_price, ai_prompt, technical_limits, current_blockage,
      fixed_logic, urgency, external_pressure, current_solutions_inadequacy,
      strategic_importance
    });

    // Fire and forget — n attend pas la reponse Discord
    sendDiscordLeadAlert(req.body).catch(() => {});

    res.status(201).json({
      success: true,
      message: 'Sondage soumis avec succes',
      data: { id: newResponse.id }
    });
  } catch (error) {
    console.error('Erreur lors de la soumission du sondage:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de l enregistrement de votre sondage.'
    });
  }
};
