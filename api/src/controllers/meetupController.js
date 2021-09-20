const { Meetup, User, Invitation } = require("../db");
const { Op } = require("sequelize");

async function getAllMeetup(req, res) {
  try {
    const allMeetup = await Meetup.findAll({
      include: [
        { model: User, order: [["user_meetups", "createdAt", "ASC"]] },
        { model: Invitation },
      ],
      order: [["date", "DESC"]],
    });
    res.json(allMeetup);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function getMeetupById(req, res) {
  try {
    const { id } = req.params;
    const meetup = await Meetup.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["username", "email", "admin"],
        },
        {
          model: Invitation,
        },
      ],
    });
    res.json(meetup);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function newMeetup(req, res) {
  try {
    const { name, temp, date, status, userId, description, bears } = req.body;
    const user = await User.findByPk(userId);
    const newMeetup = await user.createMeetup({
      name,
      temp,
      date: new Date(date),
      status,
      description,
      bears,
      adminId: userId, 
      adminName: user.username, 
      adminimg: user.img
    });
    const newInvitation = await user.createInvitation({ name, date: new Date(date), status: "Accepted", MeetupId:newMeetup.id })
    res.json(newMeetup);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function updateMeetup(req, res) {
  try {
    const { name, temp, date, status, meetupId } = req.body;
    const meetup = await Meetup.findByPk(meetupId);

    if (name) meetup.name = name;
    if (temp) meetup.temp = temp;
    if (date) meetup.date = date;
    if (status) meetup.status = status;

    await meetup.save();

    res.json(meetup);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function addInMeetup(req, res) {
  try {
    const { meetupId, userId } = req.body;
    const meetup = await Meetup.findByPk(meetupId);
    const user = await User.findByPk(userId);
    const invitation = await Invitation.findOne({
      where: {
        [Op.and]: [{ UserId: userId }, { MeetupId: meetupId }]
      }})
      
    if(invitation){
      invitation.status="Accepted"
      await invitation.save()
    }  

    await meetup.addUser(user);

    res.json(meetup);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function deleteMeetup(req, res) {
  try {
    const { id } = req.params;
    const meetup = await Meetup.findByPk(id);
    await meetup.destroy();
    res.json({ msg: `Meetup ${id} deleted` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getAllMeetup,
  getMeetupById,
  newMeetup,
  updateMeetup,
  deleteMeetup,
  addInMeetup,
};
