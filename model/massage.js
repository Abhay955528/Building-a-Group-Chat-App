const Sequlize = require("sequelize");
const sequelize = require("../util/database");
const Massage = sequelize.define("message", {
  id: {
    type: Sequlize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  massage: {
    type: Sequlize.STRING,
    defaultValue: "joined"
  },
});

module.exports = Massage;
