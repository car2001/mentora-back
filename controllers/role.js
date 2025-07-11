const pool = require('../db');
const RoleModel = require('../models/mysql/role');
const roleModel = new RoleModel(pool);


class RoleController {
    static async getAll(req, res) {
        const roles = await roleModel.getAll();
        res.json(roles);
    }
}

module.exports = RoleController;