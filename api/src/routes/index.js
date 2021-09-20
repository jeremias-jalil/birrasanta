const { Router } = require('express');
const router = Router();

const user = require('./userRoutes')
const meetup = require('./meetupRoutes')
const invitation = require('./invitationRoutes')

router.use('/user', user)
router.use('/meetup', meetup)
router.use('/invitation', invitation)

module.exports = router;