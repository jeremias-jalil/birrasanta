require("dotenv").config();

const { db } = require("./src/db");
const app = require("./src/app");

const { User } = require("./src/db");
const bcrypt = require("bcrypt");
const { AUTH_ROUNDS,ADMIN_PASS } = process.env;

const PORT = process.env.PORT || 3030;

async function userAdmin() {
  const user = await User.findOne({
    where: {
      email: "admin@admin.com",
    },
  });
  if (!user) {
     await User.create({
      username: "Admin",
      email: "admin@admin.com",
      password: bcrypt.hashSync(ADMIN_PASS, AUTH_ROUNDS * 1),
      admin: true,
      img: "https://i.ibb.co/JmV719n/Birra-Santa-Logo-Color.png",
      active: true,
    });
  }
}

db.sync({ force: false }).then(async () => {
  app.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
    userAdmin();
  });
});
