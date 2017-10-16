module.exports = {
  db: {
    host: process.env.HOST_NAME || 'localhost',
    name: process.env.DB_NAME || 'url-shortener'
  },
  webhost: process.env.APP_BASE_URL || 'http://localhost:3000/'
};
