const xss = require('xss');
const helmet = require('helmet');

// Options xss : on supprime les balises HTML dangereuses mais on n'encode PAS
// les caractères comme / ' " → le bon endroit pour encoder c'est à l'affichage,
// pas au stockage (Sequelize utilise des requêtes paramétrées contre l'injection SQL).
const xssOptions = {
  whiteList: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script', 'style'],
  escapeHtml: (str) => str, // ne pas encoder les caractères — garder les données brutes
};

exports.sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return xss(input, xssOptions);
  } else if (Array.isArray(input)) {
    return input.map(item => exports.sanitizeInput(item));
  } else if (typeof input === 'object' && input !== null) {
    const sanitizedObject = {};
    Object.keys(input).forEach(key => {
      sanitizedObject[key] = exports.sanitizeInput(input[key]);
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
        imgSrc: ["'self'", 'data:'],
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
  
  if (checkForXSS(req.query) || checkForXSS(req.body)) {
    return res.status(403).json({
      success: false,
      message: 'Requête rejetée pour raisons de sécurité'
    });
  }
  
  if (req.body) {
    req.body = exports.sanitizeInput(req.body);
  }
  
  next();
};
