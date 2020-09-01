import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/users.js';

const userRouter = express.Router();

userRouter
  .get('/', async (req, res) => {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, likes: 1, url: 1 });

    res.send(users);
  })
  .post('/', async (req, res) => {
    const body = req.body;

    if (!body.password || body.password.length < 3) {
      res.status(400).json({ error: 'password must be atleast 3 characters long' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);

  });

export default userRouter;