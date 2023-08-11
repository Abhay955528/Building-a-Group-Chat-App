const Sequlize = require("sequelize");
require('dotenv').config();
const sequelize = new Sequlize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

module.exports = sequelize;
