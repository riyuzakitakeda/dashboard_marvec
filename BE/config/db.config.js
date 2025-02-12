module.exports = {
  HOST: "103.151.20.127",
  USER: "devict",
  PASSWORD: "Makassar@2023DB",
  DB: "marvec_dashboard",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
