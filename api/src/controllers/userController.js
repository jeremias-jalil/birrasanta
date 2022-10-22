const { User, Meetup, Invitation } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../email/sendEmail");

const { AUTH_SECRET, AUTH_EXPIRES, AUTH_ROUNDS } = process.env;

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(404).send("No existe este usuario");
    } else if (!user.active) {
      res.status(401).send("Usuario inactivo");
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ user: user }, AUTH_SECRET, {
          expiresIn: AUTH_EXPIRES,
        });
        res.json({
          user: user,
          token: token,
        });
      } else {
        res.status(401).send("Usuario o contaseña incorrecta");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function register(req, res) {
  const password = bcrypt.hashSync(req.body.password, AUTH_ROUNDS * 1);

  try {
    const [user, isCreated] = await User.findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        username: req.body.name,
        password,
        admin: req.body.admin,
        img: req.body.img,
        active: true,
      },
    });
    if (isCreated) {
      const token = jwt.sign({ user: user }, AUTH_SECRET, {
        expiresIn: AUTH_EXPIRES,
      });

      const content = {
        title: "Tu usuario fue creado con éxito!!!",
        message: `Hola ${user.username}, ya tienes tu cuenta en Birra Santa, recibirás notificaciones cunado te inviten a una Meetup. Que lo disfrutes!!!`,
        buttonLink: "https://birrasanta.vercel.app/",
        buttonText: "Ir a Birra Santa",
        noteMessage: "No olvides llevar la mejor onda!!!. ",
      };
      sendEmail(user.email, content);

      res.json({
        user: user,
        token: token,
      });
    } else {
      res.status(401).send("Usuario ya existe");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      include: [{ model: Meetup }, { model: Invitation }],
    });
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        {
          model: Meetup,
          include: [
            {
              model: User,
              order: [["user_meetups", "createdAt", "ASC"]],
            },
            { model: Invitation, include: User },
          ],
        },
        { model: Invitation, include: { model: Meetup, include: User } },
      ],
      order: [[{ model: Meetup }, "date", "DESC"]],
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const { admin, active } = req.body;
    console.log(admin, active);
    const user = await User.findByPk(id);
    if (admin !== undefined) {
      user.admin = admin;
    }
    if (active !== undefined) {
      user.active = active;
    }

    await user.save();

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  login,
  register,
  getAllUsers,
  getUserById,
  updateUser,
};
