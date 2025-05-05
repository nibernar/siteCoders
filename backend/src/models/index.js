const sequelize = require('../config/database');
const Contact = require('./Contact');

// Fonction pour tester la connexion
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');
    return true;
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
    return false;
  }
};

// Fonction pour fermer la connexion
const closeConnection = async () => {
  try {
    await sequelize.close();
    return true;
  } catch (error) {
    console.error('Erreur lors de la fermeture de la connexion:', error);
    return false;
  }
};

module.exports = {
  sequelize,
  Contact,
  testConnection,
  closeConnection
};