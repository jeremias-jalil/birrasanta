
const { DataTypes } = require('sequelize');

module.exports = (db) => {
db.define("Meetup", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temp: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   bears: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  }  ,
  status: {
    type: DataTypes.ENUM("Activo","Cancelada", "Concluida"),
    allowNull: false,
  }, 
  description: {
    type: DataTypes.STRING,
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   adminName: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   adminimg: {
    type: DataTypes.STRING,
    allowNull: false,
   },
});}



