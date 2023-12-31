const Sequlize = require("sequelize");
const sequelize = require("../util/database");
const User = sequelize.define("user", {
  id: {
    type: Sequlize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name:{
    type:Sequlize.STRING,
    allowNull:false
  },
  email:{
    type:Sequlize.STRING,
    allowNull:false,
    primaryKey:true
  },
  pass:{
    type:Sequlize.STRING,
    allowNull:false
  },
  number:{
    type:Sequlize.STRING,
    allowNull:false,
    primaryKey:true
  },
});

module.exports = User;
