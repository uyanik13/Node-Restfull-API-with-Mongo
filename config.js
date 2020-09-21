module.exports = {
  port: process.env.PORT || 3001,
  db: process.env.MONGODB || 'mongodb://localhost:8080/shop',
  SECRET_TOKEN: 'token'
}
