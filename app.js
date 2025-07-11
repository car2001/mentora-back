const express = require('express');
const cors = require('cors');
const app = express();

const roleRouter = require('./routes/role.js');
const userRouter = require('./routes/user.js');
const loginRouter = require('./routes/login.js');

app.use(cors());
app.use(express.json())
app.disable("x-powered-by")

app.use('/api/role', roleRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);

module.exports = app;
