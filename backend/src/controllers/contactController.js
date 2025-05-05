const Contact = require('../models/Contact');
const { apiResponse } = require('../utils');
const { sanitizeInput } = require('../utils/security');

// Créer un nouveau contact avec protection XSS renforcée
exports.createContact = async (req, res) => {
  try {
    // Récupérer et sanitiser les données du formulaire
    const { name, email, message, company } = sanitizeInput(req.body);
    
    // Validation supplémentaire pour l'email (en plus des validateurs)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return apiResponse.error(res, 'Format d\'email invalide', 400);
    }
    
    // Vérifier si l'email existe déjà
    const existingContact = await Contact.findOne({ where: { email } });
    if (existingContact) {
      return apiResponse.error(
        res, 
        'Un message avec cette adresse email a déjà été soumis',
        400
      );
    }
    
    // Créer l'enregistrement dans la base de données
    const contact = await Contact.create({
      name,
      email,
      message,
      company,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    // Enregistrer l'activité (facultatif)
    console.log(`Nouveau message de contact créé (ID: ${contact.id}) par ${email} depuis ${req.ip}`);
    
    return apiResponse.success(
      res, 
      { id: contact.id },
      'Message envoyé avec succès',
      201
    );
  } catch (error) {
    console.error('Erreur lors de la création du contact:', error);
    return apiResponse.error(
      res,
      'Impossible d\'enregistrer votre message',
      500
    );
  }
};

exports.getContacts = async (req, res) => {
  try {
    // Implémentation simple qui renvoie une liste vide pour le moment
    return res.status(200).json({
      success: true,
      message: 'Liste des contacts',
      data: []
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des contacts:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des contacts',
      error: error.message
    });
  }
};