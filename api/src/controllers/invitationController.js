const { Meetup, User, Invitation } = require("../db");
const {sendEmail} = require("../email/sendEmail")

async function getAllInvitation(req, res) {
  try {
    const allInvitation = await Invitation.findAll({
      include: [{ model: User }, { model: Meetup }],
    });
    res.json(allInvitation);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function getInvitationById(req, res) {
  try {
    const { id } = req.params;
    const invitation = await Invitation.findByPk(id, {
      include: [{ model: User }, { model: Meetup }],
    });
    res.json(invitation);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function newInvitation(req, res) {
  try {
    const { name, date, status, userId, meetupId } = req.body;
    const user = await User.findByPk(userId);
    const newInvitation = await user.createInvitation({ name, date: new Date(date), status, MeetupId:meetupId });

    const content = {
      title: "Fuiste invitado a tomar birra!!!",
      message: `Hola ${user.username}, fuiste invitado a tomar unas birras junto a todo el equipo de IT de Santander`,
      buttonLink: "http://localhost:3000/",
      buttonText: "Confirmar asistencia",
      noteMessage: "No olvides llevar la mejor onda!!!. ",
    };
    sendEmail(user.email, content)
    res.json(newInvitation);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function updateInvitation(req, res) {
  try {
    const { name, date, status, invitationId, meetupId, userId  } = req.body;
    const invitation = await Invitation.findByPk(invitationId);
 

    if (name) invitation.name = name;
    if (date) invitation.date = date;
    if (status) invitation.status = status;
    await invitation.save();

    if(status==="Accepted"){
      const meetup = await Meetup.findByPk(meetupId);
      const user = await User.findByPk(userId);
      await meetup.addUser(user)
    }
    
    res.json(invitation);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function deleteInvitation(req, res) {
  try {
    const { id } = req.params;
    const invitation = await Invitation.findByPk(id);
    await invitation.destroy();
    res.json({ msg: `Invitation ${id} deleted` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getAllInvitation,
  getInvitationById,
  newInvitation,
  updateInvitation,
  deleteInvitation,
};
