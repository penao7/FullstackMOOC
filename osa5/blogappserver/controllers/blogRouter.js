import express from 'express';
import Blog from '../models/blogs.js';
import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import config from '../utils/config.js';
import Comment from '../models/comments.js';

const blogRouter = express.Router();

blogRouter
  .get('/', async (req, res) => {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
      .populate('comments');

    res.json(blogs.map(blog => blog.toJSON()));
  })
  .post('/', async (req, res) => {
    const body = req.body;
    const decodedToken = jwt.verify(req.token, config.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    let likes = 0;

    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV.trim()) {
      likes = body.likes;
    }

    const blog = new Blog({
      author: body.author ? body.author : '',
      title: body.title ? body.title : '',
      user: decodedToken.id ? decodedToken.id : '',
      url: body.url ? body.url : '',
      likes: likes
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    if(savedBlog) {
      const populatedBlog = await Blog.findById(savedBlog._id).populate('user');
      res.status(201).json(populatedBlog.toJSON());
    }

  });

blogRouter
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate('comments');

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
      const result = await Blog.findByIdAndDelete(blog.id);
      res.status(204).send(result);
    } else {
      res.status(401).send({ error: 'not authorized' });
    }

  })
  .put('/:id', async (req, res) => {
    const id = req.params.id;
    let newValues = {};

    if (req.body.title) {
      newValues.title = req.body.title;
    }

    if (req.body.likes) {
      newValues.likes = req.body.likes;
    }

    if (req.body.author) {
      newValues.author = req.body.author;
    }

    if (req.body.url) {
      newValues.url = req.body.url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id,
      newValues
      , { new: true });

    if (updatedBlog) {
      const newBlog = await Blog.findById(updatedBlog.id).populate('user').populate('comments');
      res.send(newBlog.toJSON());
    } else {
      res.status(400).end();
    }
  });

blogRouter
  .get('/:id/comments', async (req, res) => {
    const id = req.params.id;
    const comments = await Comment.find({ blog: id });
    res.json(comments.map(comment => comment.toJSON()));
  })
  .post('/:id/comments', async (req, res) => {

    const id = req.params.id;
    const blog = await Blog.findById(id);

    const comment = new Comment({
      comment: req.body.comment,
      blog: id
    });

    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();

    res.status(201).json(savedComment.toJSON());
  });

blogRouter
  .get('/:id/comments/:commentId', async (req, res) => {
    const id = req.params.commentId;
    const comment = await Comment.findById(id);
    res.send(comment.toJSON());
  });

export default blogRouter;