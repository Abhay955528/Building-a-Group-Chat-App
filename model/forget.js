const Sequlize = require("sequelize");
const sequelize = require("../util/database");

const Forget = sequelize.define("forget", {
  id: {
    type: Sequlize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  isActive: Sequlize.BOOLEAN,
});

module.exports = Forget;