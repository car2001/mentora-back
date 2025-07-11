
const roleRouter = require('express').Router();
const RoleController = require('../controllers/role');

roleRouter.get('/', RoleController.getAll);

module.exports = roleRouter;