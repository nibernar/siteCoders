const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { configureHelmet, xssProtection } = require('./utils/security');
const routes = require('./routes');

const app = express();

// Protection CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Protection contre les injections et les attaques XSS
app.use(configureHelmet());
app.use(xssProtection);

// Limiteur de taux pour prévenir les attaques par force brute
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
  standardHeaders: true,
  message: {
    success: false,
    message: 'Trop de requêtes, veuillez réessayer plus tard'
  }
});
app.use('/api/', limiter);

// Limiteur spécifique pour le formulaire de contact
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5, // 5 soumissions de formulaire par heure
  standardHeaders: true,
  message: {
    success: false,
    message: 'Limite de soumission atteinte, veuillez réessayer plus tard'
  }
});
app.use('/api/contact', contactLimiter);

// Parser le corps des requêtes
app.use(express.json({ limit: '10kb' })); // Limiter la taille pour prévenir les attaques DoS
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// En-têtes de sécurité supplémentaires
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Routes API
app.use('/api', routes);

// Gestion des routes inexistantes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
  });
});

module.exports = app;