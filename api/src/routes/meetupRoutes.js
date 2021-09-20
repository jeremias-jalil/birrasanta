const { Router } = require('express');
const router = Router();

const auth = require("../middlewares/auth")

const {
    getAllMeetup,
    getMeetupById,
    newMeetup,
    updateMeetup,
    deleteMeetup,
    addInMeetup
  } = require('../controllers/meetupController')

router.get('/getall',auth, getAllMeetup)
router.get('/:id', getMeetupById)

router.post('/new',auth, newMeetup)
router.post('/add', addInMeetup)

router.put('/update',auth, updateMeetup)

router.delete('/delete/:id',auth, deleteMeetup)


module.exports = router