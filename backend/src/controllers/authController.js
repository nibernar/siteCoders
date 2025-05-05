const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtConfig = require('../config/jwt');
const { apiResponse } = require('../utils');
const User = require('../models/User'); // Supposons que vous avez un modèle User pour l'authentification

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Recherche de l'utilisateur
    const user = await User.findOne({ where: { email } });
    
    // Vérification du mot de passe (si utilisateur existe)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return apiResponse.error(res, 'Email ou mot de passe incorrect', 401);
    }
    
    // Création du token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtConfig.secret,
      { 
        expiresIn: jwtConfig.expiresIn,
        issuer: jwtConfig.issuer
      }
    );
    
    return apiResponse.success(res, { token }, 'Authentification réussie');
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return apiResponse.error(res, 'Erreur lors de l\'authentification', 500);
  }
};

// Pour générer un jeton d'API simple (peut être utilisé pour des accès API limités comme le formulaire)
exports.createApiToken = async (req, res) => {
  try {
    // Créer un token limité pour l'API publique
    const token = jwt.sign(
      { type: 'api_access', scope: 'contact_form' },
      jwtConfig.secret,
      { 
        expiresIn: '30d',
        issuer: jwtConfig.issuer
      }
    );
    
    return apiResponse.success(res, { token }, 'Token API créé avec succès');
  } catch (error) {
    console.error('Erreur lors de la création du token API:', error);
    return apiResponse.error(res, 'Erreur lors de la création du token API', 500);
  }
};