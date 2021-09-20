const { Router } = require('express');
const router = Router();

const auth = require("../middlewares/auth")

const {
    getAllInvitation,
    getInvitationById,
    newInvitation,
    updateInvitation,
    deleteInvitation,
  } = require('../controllers/invitationController')

router.get('/getall',auth, getAllInvitation)
router.get('/:id', getInvitationById)

router.post('/new',auth, newInvitation)

router.put('/update', updateInvitation)

router.delete('/delete/:id',auth, deleteInvitation)

module.exports = router