import Blog from '../models/blogs.js';
import User from '../models/users.js';

export const url = '/api/blogs';

export const blogUrl = 'http://thisisjusttesturl.com/testing';
export const id = "5f44d1f41942bf37903ec5d2"

export const initialBlogs2 = [
  {
    title: 'Mandoliinimies',
    author: "Testaaja1",
    likes: 8,
    url: blogUrl
  },
  {
    title: 'Canonical string reduction',
    author: "Testaaja2",
    likes: 20,
    url: blogUrl
  },
  {
    title: 'World order',
    author: "Testaaja3",
    likes: 10,
    url: blogUrl
  },
  {
    title: 'Eput',
    author: "Testaaja2",
    likes: 2,
    url: blogUrl
  },
  {
    title: 'Kasvitiede',
    author: "Testaaja5",
    likes: 4,
    url: blogUrl
  }
];

export const initialBlogs = [
  {
    title: 'Mandoliinimies',
    user: id,
    author: 'd',
    likes: 8,
    url: blogUrl
  },
  {
    title: 'Canonical string reduction',
    user: id,
    author: 'a',
    likes: 20,
    url: blogUrl
  },
  {
    title: 'World order',
    user: id,
    author: 'c',
    likes: 10,
    url: blogUrl
  },
  {
    title: 'Eput',
    user: id,
    author: 'b',
    likes: 2,
    url: blogUrl
  },
  {
    title: 'Kasvitiede',
    user: id,
    author: 'a',
    likes: 4,
    url: blogUrl
  },
  {
    title: 'Stars and planets',
    user: id,
    author: 'b',
    likes: 23,
    url: blogUrl
  },
  {
    title: 'Earth & Water & Fire & Wind',
    user: id,
    author: 'a',
    likes: 1,
    url: blogUrl
  },
  {
    title: 'History of Medicide',
    user: id,
    author: 'b',
    likes: 2,
    url: blogUrl
  }
];

export const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethis', user: id, author: 'Tester', url: 'testUrl' });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

export const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

export const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

export const returnValidIdAndToken = async (api) => {
  await User.deleteMany({});

  const newUser = {
    username: 'tester2',
    name: 'TestO',
    password: 'youneverguess'
  };

  const user = await api
    .post('/api/users')
    .send(newUser);

  const token = await api
    .post('/api/login')
    .send({
      username: newUser.username,
      password: newUser.password
    });

  return { id: user.body.id, token: token.body.token };
};

