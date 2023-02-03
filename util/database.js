// const Sequelize = require("sequelize")
// const Sequelize = require("sequelize").Sequelize;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "limitiedidu@4.7", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
