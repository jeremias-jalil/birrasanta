require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');

const {
  DATABASE_URL,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_HOST_PORT,
  DB_DATABASE,
  DB_DIALECT,
} = process.env;

const db = new Sequelize(
  DATABASE_URL ||
    `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_HOST_PORT}/${DB_DATABASE}`,{
        logging: false, 
        native: false,
      }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(db));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(db.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
db.models = Object.fromEntries(capsEntries);


const { Invitation,Meetup, User  } = db.models;


User.belongsToMany(Meetup, { through: "user_meetups" });
Meetup.belongsToMany(User, { through: "user_meetups" });

User.hasMany(Invitation);
Invitation.belongsTo(User);

Invitation.belongsTo(Meetup, {foreignKey: "MeetupId", onDelete: 'cascade',hooks: true});
Meetup.hasMany(Invitation);



db.authenticate()
  .then(() => console.log("conectado"))
  .catch((e) => console.log(e));

  module.exports = {
    ...db.models, 
    db, 
  };