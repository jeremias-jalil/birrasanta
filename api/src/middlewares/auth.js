const jwt = require('jsonwebtoken')
const { AUTH_SECRET } = process.env
const { User } = require("../db");

module.exports = (req, res, next) => {

    if (!req.headers.authorization) { 
        res.status(401).json({ msg: "Acceso no autorizado" })

    } else {

        let token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, AUTH_SECRET, (err, decoded) => {
            if (err) {
                res.status(500).json({ msg: "Error en decodificar token", err })
            } else {
                User.findByPk(decoded.user.id).then(user => {
                    req.user = user
                    next()
                })

            }
        })

    }

}