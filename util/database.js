const Sequlize = require("sequelize");
const sequelize = new Sequlize("gourp-chat", "root",'12345', {
  host: 'localhost',
  dialect: "mysql",
});

module.exports = sequelize;
