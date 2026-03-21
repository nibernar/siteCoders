const app = require("./app");
const config = require("./config");
const db = require("./models");
const dotenv = require("dotenv");
const path = require("path");

// Chargement des variables d'environnement
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Fonction asynchrone pour démarrer l'application
async function startServer() {
  try {
    // Tester la connexion à la base de données
    const dbConnected = await db.testConnection();
    if (!dbConnected) {
      console.error("Database connection failed. Check your configuration.");
      // On continue quand même pour permettre le démarrage du serveur
      // même en cas de problème temporaire avec la DB
    }

    // Démarrage du serveur
    const PORT = process.env.PORT || config.server.port || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
      if (dbConnected) {
        console.log("Database connection: OK");
      } else {
        console.log("Database connection: FAILED - Server started anyway");
      }
    });

    // Gestion des arrêts propres
    process.on("SIGINT", async () => {
      console.log("SIGINT signal received: closing HTTP server and database connections");
      await gracefulShutdown(server);
    });

    process.on("SIGTERM", async () => {
      console.log("SIGTERM signal received: closing HTTP server and database connections");
      await gracefulShutdown(server);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Fonction pour arrêter proprement le serveur et fermer les connexions à la base de données
async function gracefulShutdown(server) {
  try {
    // Fermer le serveur HTTP
    server.close(() => {
      console.log("HTTP server closed");
    });

    // Fermer les connexions à la base de données
    await db.closeConnection();
    console.log("All connections closed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
    process.exit(1);
  }
}

// Démarrer le serveur
startServer();
