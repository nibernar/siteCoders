const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { apiResponse } = require('../utils');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return apiResponse.error(res, 'Accès non autorisé. Token manquant', 401);
  }
  
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return apiResponse.error(res, 'Token invalide ou expiré', 401);
  }
};

// Pour les routes publiques qui peuvent être utilisées avec ou sans authentification
exports.optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    req.user = null;
    return next();
  }
  
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
  } catch (error) {
    req.user = null;
  }
  
  next();
};