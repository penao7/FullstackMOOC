import jwt from 'jsonwebtoken';
import config from '../utils/config.js';
import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/users.js';

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const body = req.body;

  console.log(body);
  const user = await User.findOne({ username: body.username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  const token = jwt.sign(userForToken, config.SECRET);

  res.status(200)
    .send({ token, username: user.username, name: user.name });

});

export default loginRouter;