const Sequlize = require("sequelize");
const sequelize = require("../util/database");
const Massage = sequelize.define("message", {
  id: {
    type: Sequlize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  massage: {
    type: Sequlize.STRING,
    allowNull: false,
  },
});

module.exports = Massage;
