-- Script SQL simplifié pour CODERS🤖 - Formulaire de contact
-- Ce script crée uniquement la structure nécessaire pour gérer un formulaire de contact
-- Compatible avec MySQL 8.0+

-- Configuration de base
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------
-- 1. Création de la base de données
-- ------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS coders_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE coders_db;

-- ------------------------------------------------------------
-- 2. Création de la table de formulaire de contact
-- ------------------------------------------------------------

-- Contact Submissions table - Stocke les soumissions du formulaire de contact
CREATE TABLE IF NOT EXISTS contact_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,                     -- Votre nom *
  email VARCHAR(255) NOT NULL,                    -- Adresse email *
  message TEXT NOT NULL,                          -- Votre message *
  company VARCHAR(255),                           -- Nom de votre société (optionnel)
  ip_address VARCHAR(45),                         -- Adresse IP (pour information)
  user_agent TEXT,                                -- Agent utilisateur (pour information)
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Date de soumission
  INDEX idx_contact_submissions_email (email),
  INDEX idx_contact_submissions_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ------------------------------------------------------------
-- 3. Création des utilisateurs avec privilèges appropriés
-- ------------------------------------------------------------

-- Utilisateur pour l'application web
CREATE USER IF NOT EXISTS 'coders_user'@'%' IDENTIFIED BY 'coders_password';
-- Si l'utilisateur existe déjà, mise à jour du mot de passe
ALTER USER IF EXISTS 'coders_user'@'%' IDENTIFIED BY 'coders_password';

-- Révocation des privilèges existants pour partir sur une base propre
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'coders_user'@'%';

-- Attribution des privilèges minimaux nécessaires pour le formulaire de contact
GRANT SELECT, INSERT, UPDATE ON coders_db.contact_submissions TO 'coders_user'@'%';

-- Utilisateur pour phpMyAdmin (accès complet à la table contact_submissions)
CREATE USER IF NOT EXISTS 'admin_user'@'%' IDENTIFIED BY '${DB_ADMIN_PASSWORD}';
-- Si l'utilisateur existe déjà, mise à jour du mot de passe
ALTER USER IF EXISTS 'admin_user'@'%' IDENTIFIED BY '${DB_ADMIN_PASSWORD}';

-- Révocation des privilèges existants pour partir sur une base propre
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'admin_user'@'%';

-- Attribution des privilèges nécessaires pour la gestion de la table contact_submissions
GRANT SELECT, INSERT, UPDATE, DELETE ON coders_db.contact_submissions TO 'admin_user'@'%';

-- ------------------------------------------------------------
-- 4. Limites de connexion pour éviter la surcharge
-- ------------------------------------------------------------

-- Limites raisonnables pour l'utilisateur de l'application
ALTER USER 'coders_user'@'%' WITH
  MAX_QUERIES_PER_HOUR 5000
  MAX_CONNECTIONS_PER_HOUR 500;

-- Limites pour l'utilisateur administratif
ALTER USER 'admin_user'@'%' WITH
  MAX_QUERIES_PER_HOUR 10000
  MAX_CONNECTIONS_PER_HOUR 200;

-- ------------------------------------------------------------
-- 5. Activation des vérifications de clés étrangères & privilèges
-- ------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 1;
FLUSH PRIVILEGES;

-- ------------------------------------------------------------
-- 6. Instructions pour vérifier les privilèges (exécution manuelle)
-- ------------------------------------------------------------
-- Pour vérifier les privilèges utilisateur, exécutez:
-- SHOW GRANTS FOR 'coders_user'@'%';
-- SHOW GRANTS FOR 'admin_user'@'%';