const xss = require('xss');
const helmet = require('helmet');

// Fonction pour nettoyer les entrées utilisateur contre les attaques XSS
exports.sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return xss(input);
  } else if (Array.isArray(input)) {
    return input.map(item => this.sanitizeInput(item));
  } else if (typeof input === 'object' && input !== null) {
    const sanitizedObject = {};
    Object.keys(input).forEach(key => {
      sanitizedObject[key] = this.sanitizeInput(input[key]);
    });
    return sanitizedObject;
  }
  return input;
};

// Configuration complète des protections Helmet
exports.configureHelmet = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"]
      }
    },
    xssFilter: true,
    noSniff: true,
    referrerPolicy: { policy: 'same-origin' }
  });
};

// Middleware pour détecter et bloquer les attaques XSS basiques
exports.xssProtection = (req, res, next) => {
  // Vérification des patterns XSS courants dans les paramètres de requête
  const checkForXSS = (obj) => {
    if (!obj) return false;
    const xssPatterns = [
      /<script\b[^>]*>(.*?)<\/script>/gi,
      /javascript:/gi,
      /onerror=/gi,
      /onload=/gi,
      /onclick=/gi
    ];
    
    return Object.values(obj).some(value => {
      if (typeof value === 'string') {
        return xssPatterns.some(pattern => pattern.test(value));
      } else if (typeof value === 'object') {
        return checkForXSS(value);
      }
      return false;
    });
  };
  
  // Vérifier les paramètres de requête et le corps
  if (checkForXSS(req.query) || checkForXSS(req.body)) {
    return res.status(403).json({
      success: false,
      message: 'Requête rejetée pour raisons de sécurité'
    });
  }
  
  // Sanitiser automatiquement le corps de la requête
  if (req.body) {
    req.body = exports.sanitizeInput(req.body);
  }
  
  next();
};