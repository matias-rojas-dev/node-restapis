const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
    const user = await new Users(req.body);
    user.password = await bcrypt.hash(req.body.password, 12);

    try {
        await user.save();
        res.json({
            msg: "Usuario creado con éxito"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: "Hubo un error"
        })
    }
}

exports.login = async (req, res) => {

}