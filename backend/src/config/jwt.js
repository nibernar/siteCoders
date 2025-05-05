module.exports = {
    secret: process.env.JWT_SECRET || 'votre_secret_jwt_securise',
    expiresIn: '1h',
    issuer: 'coders-api'
  };