const pool = require('../db');
const UserModel = require('../models/mysql/user.js');
const userModel = new UserModel(pool);


class UserController {

    static async create(req, res) {
        try {
            const newUser = await userModel.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
                res.status(400).json({ message: 'Ya existe un usuario con ese correo.' });
            } else {
                res.status(500).json({ message: 'Error interno del servidor.' });
            }
        }
    }
}

module.exports = UserController;