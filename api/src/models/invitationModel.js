
const { DataTypes } = require("sequelize");


module.exports = (db) => {
db.define("Invitation", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Accepted", "Cancelled","Present", "Missing"),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});}

