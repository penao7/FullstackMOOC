import express from 'express';
import Blog from '../models/blogs.js';
import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import config from '../utils/config.js';

const blogRouter = express.Router();

blogRouter
  .get('/', async (req, res) => {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 });

    res.json(blogs.map(blog => blog.toJSON()));
  })
  .post('/', async (req, res) => {
    const body = req.body;
    const decodedToken = jwt.verify(req.token, config.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      author: body.author ? body.author : '',
      title: body.title ? body.title : '',
      user: decodedToken.id ? decodedToken.id : '',
      url: body.url ? body.url : ''
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog.toJSON());
  });

blogRouter
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (blog) {
      res.send(blog);
    } else {
      res.status(404).end();
    }

  })
  .delete('/:id', async (req, res) => {
    const id = req.params.id;
    const decodedToken = jwt.verify(req.token, config.SECRET);
    const blog = await Blog.findById(id);
    const user = await User.findById(decodedToken.id);

    if (blog.user.toString() === decodedToken.id.toString() && user.username === decodedToken.username) {
      await Blog.findByIdAndDelete(blog.id);
      res.status(204).end();
    } else {
      res.status(401).send({ error: 'not authorized' });
    }

  })
  .put('/:id', async (req, res) => {
    const id = req.params.id;

    const newValues = {};

    if (req.body.title) {
      newValues.title = req.body.title;
    }

    if (req.body.likes) {
      newValues.likes = req.body.likes;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id,
      newValues
      , { new: true });
    if (updatedBlog) {
      res.send(updatedBlog);
    } else {
      res.status(400).end();
    }
  });

export default blogRouter;