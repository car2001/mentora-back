const userRouter = require('express').Router();
const UserController = require('../controllers/user.js');

userRouter.post('/', UserController.create);

module.exports = userRouter;