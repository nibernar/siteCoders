import { LocaleContent } from '../types';

export const fr: LocaleContent = {
  header: {
    nav: {
      process: 'Notre Processus',
      benefits: 'Avantages',
      faq: 'FAQ',
      contact: 'Contact',
    },
    cta: 'Contactez-nous',
  },
  hero: {
    title: 'L\'automatisation du code pour les agences digitales',
    subtitle: 'CODERS🤖 transforme vos cahiers des charges en code source de qualité production, accélérant vos projets et réduisant vos coûts de développement.',
    cta: 'Découvrir comment ça marche',
  },
  process: {
    title: 'Notre Processus',
    intro: 'Découvrez comment notre technologie transforme votre cahier des charges en code source prêt à l\'emploi en six étapes simples.',
    steps: [
      {
        title: 'Étape 1',
        description: 'L\'agence soumet son cahier des charges technique détaillé via notre portail sécurisé',
      },
      {
        title: 'Étape 2',
        description: 'Notre système analyse les spécifications et exigences du projet',
      },
      {
        title: 'Étape 3',
        description: 'En quelques heures, l\'agence reçoit un devis précis (coût et délai de livraison)',
      },
      {
        title: 'Étape 4',
        description: 'Après validation et paiement initial, CODERS lance la génération du projet',
      },
      {
        title: 'Étape 5',
        description: 'L\'agence suit l\'avancement en temps réel via le Dashboard dédié',
      },
      {
        title: 'Étape 6',
        description: 'Le code source complet est livré dans les délais convenus, prêt à être déployé',
      },
    ],
  },
  benefits: {
    title: 'Avantages',
    intro: 'Notre solution d\'automatisation offre des bénéfices significatifs pour votre agence digitale.',
    items: [
      {
        title: 'Réduction des Coûts',
        description: 'Diminuez jusqu\'à 70% vos coûts de développement en automatisant la génération de code.',
      },
      {
        title: 'Gain de Temps',
        description: 'Accélérez vos cycles de développement de 5x en moyenne et respectez tous vos délais.',
      },
      {
        title: 'Qualité Constante',
        description: 'Obtenez un code de qualité professionnelle, standardisé et optimisé à chaque fois.',
      },
      {
        title: 'Focus Stratégique',
        description: 'Concentrez vos ressources sur la stratégie et la créativité plutôt que sur le code répétitif.',
      },
    ],
  },
  faq: {
    title: 'Questions Fréquentes',
    items: [
      {
        question: 'Quels types de projets CODERS🤖 peut-il générer ?',
        answer: 'Notre technologie peut générer le code source pour des sites web, applications web et mobiles à partir de cahiers des charges détaillés. Nous supportons les technologies modernes comme React, Vue, Angular, Flutter, et les applications natives iOS et Android.',
      },
      {
        question: 'Comment garantissez-vous la qualité du code généré ?',
        answer: 'Notre système applique les meilleures pratiques de développement et suit les standards de l\'industrie. Chaque projet généré passe par des tests automatisés rigoureux pour garantir un code propre, maintenable et performant.',
      },
      {
        question: 'Puis-je modifier le code après livraison ?',
        answer: 'Absolument ! Vous recevez 100% du code source, bien documenté et suivant les conventions modernes. Vos développeurs peuvent facilement prendre le relais pour des personnalisations spécifiques ou des évolutions futures.',
      },
      {
        question: 'Combien de temps faut-il pour générer un projet complet ?',
        answer: 'Le temps varie selon la complexité du projet, mais nous livrons généralement en quelques jours ce qui prendrait plusieurs semaines ou mois avec le développement traditionnel.',
      },
    ],
  },
  contact: {
    title: 'Contactez-nous',
    intro: 'Prêt à transformer votre processus de développement ? Contactez-nous pour une démonstration ou un devis personnalisé.',
    form: {
      email: {
        label: 'Adresse email',
        placeholder: 'votre@email.com',
        required: 'L\'email est requis',
        invalid: 'Veuillez entrer une adresse email valide',
      },
      name: {
        label: 'Votre nom',
        placeholder: 'Jean Dupont',
        required: 'Le nom est requis',
      },
      company: {
        label: 'Nom de votre société',
        placeholder: 'Agence Digitale',
      },
      message: {
        label: 'Votre message',
        placeholder: 'Parlez-nous de vos besoins...',
      },
      submit: 'Envoyer',
      success: 'Message envoyé avec succès !',
      error: 'Une erreur est survenue. Veuillez réessayer.',
    },
  },
  footer: {
    company: '© 2025 CODERS🤖. Tous droits réservés.',
    links: [
      {
        label: 'Entreprise',
        items: [
          { label: 'À propos', url: '#' },
          { label: 'Carrières', url: '#' },
          { label: 'Blog', url: '#' },
        ],
      },
      {
        label: 'Ressources',
        items: [
          { label: 'Documentation', url: '#' },
          { label: 'Tutoriels', url: '#' },
          { label: 'Études de cas', url: '#' },
        ],
      },
      {
        label: 'Légal',
        items: [
          { label: 'Confidentialité', url: '#' },
          { label: 'Conditions', url: '#' },
          { label: 'Cookies', url: '#' },
        ],
      },
    ],
    legal: '© 2025 CODERS🤖. Tous droits réservés.',
  },
};