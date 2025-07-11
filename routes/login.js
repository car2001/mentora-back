const express = require('express');
const LoginController = require('../controllers/login');

const loginRouter = express.Router();

loginRouter.post('/', LoginController.login);

module.exports = loginRouter;
