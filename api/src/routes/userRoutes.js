const { Router } = require('express');
const router = Router();

const auth = require("../middlewares/auth")

const {register, login, getAllUsers, getUserById, updateUser} = require('../controllers/userController')

router.post('/register', register)
router.post('/login', login)

router.get('/allusers',auth,getAllUsers)

router.get('/:id',getUserById)

router.put('/:id',auth,updateUser)

module.exports = router