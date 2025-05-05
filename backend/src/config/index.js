module.exports = {
  database: {
    host: process.env.DB_HOST || 'database',
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME || 'coders_db',
    user: process.env.DB_USER || 'coders_user',
    password: process.env.DB_PASSWORD || 'coders_password'
  },
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development'
  }
};