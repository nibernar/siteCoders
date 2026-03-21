const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SurveyResponse = sequelize.define('SurveyResponse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  current_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  project_stage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tool_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  main_goal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  used_nocode: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  nocode_abandon_reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  priorities_ranking: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  ai_expectations: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  ideal_price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ai_prompt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  technical_limits: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  current_blockage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 }
  },
  fixed_logic: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 }
  },
  urgency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 }
  },
  external_pressure: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 }
  },
  current_solutions_inadequacy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 }
  },
  strategic_importance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 }
  }
}, {
  tableName: 'survey_responses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = SurveyResponse;
