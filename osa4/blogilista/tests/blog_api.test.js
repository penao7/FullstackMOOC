import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import app from '../app.js';
import Blog from '../models/blogs.js';
import User from '../models/users.js';
import {
  initialBlogs,
  blogsInDb,
  usersInDb,
  nonExistingId,
  url,
  blogUrl,
  returnValidIdAndToken
} from './test_helper.js';

const api = supertest(app);

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
  });

  test('all blogs are returned at json 200', async () => {
    await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs returned', async () => {
    const blogs = await blogsInDb();

    expect(blogs).toHaveLength(initialBlogs.length);
  });

  test('a specific blog is within the returned blogs 200', async () => {
    const blogs = await blogsInDb();
    const firstBlog = blogs[0];

    expect(firstBlog.title).toBe('Mandoliinimies');
  });
});

describe('viewing specifig blog', () => {
  test('a specific blog can be viewed 200', async () => {
    const blogsAtStart = await blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`${url}/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedBlogView = JSON.parse(JSON.stringify(blogToView));

    expect(resultBlog.body).toEqual(processedBlogView);

  });

  test('if blog does not exist, fails with 404', async () => {
    const validNonExistingId = await nonExistingId();

    await api
      .get(`${url}/${validNonExistingId}`)
      .expect(404);
  });

  test('statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d54032kfdS1a82a6662';

    await api
      .get(`${url}/${invalidId}`)
      .expect(404);

  });

  test('blog\'s returned id field is id', async () => {
    const values = await returnValidIdAndToken(api);
    const newBlog = {
      author: 'Tester',
      title: 'likeTesting',
      url: 'testurl'
    };

    await api
      .post(url)
      .set('Authorization', `Bearer ${values.token}`)
      .send(newBlog)
      .expect(201);

    const blogs = await blogsInDb();

    expect(blogs[blogs.length - 1].id).toBeDefined();
  });
});

describe('addition of a new blog', () => {
  test('a valid blog can be added 201', async () => {
    const blogsAtStart = await blogsInDb();
    const values = await returnValidIdAndToken(api);

    const newBlog = {
      url: 'http://something.fi',
      author: 'Tester',
      title: 'simplified async calls with async/await'
    };

    await api
      .post(url)
      .set('Authorization', `Bearer ${values.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);

    const titles = blogsAtEnd.map(b => b.title);
    expect(titles).toContain(
      'simplified async calls with async/await'
    );
  });

  test('a blog\'s likes initally sets to 0 201', async () => {
    const values = await returnValidIdAndToken(api);
    const newBlog = {
      author: 'Tester',
      title: 'likeTesting',
      url: 'testurl'
    };

    await api
      .post(url)
      .set('Authorization', `Bearer ${values.token}`)
      .send(newBlog)
      .expect(201);

    const blogs = await blogsInDb();

    expect(blogs[blogs.length - 1].likes).toBe(0);
  });

  test('a blog without title and url cannot be added 400', async () => {
    const values = await returnValidIdAndToken(api);
    const blogsAtStart = await blogsInDb();

    const newBlog = {
      author: 'Tester',
      likes: 10
    };

    await api
      .post(url)
      .set('Authorization', `Bearer ${values.token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });
});

describe('deletion of a blog', () => {
  test('a blog can be deleted and succeeds with id 204', async () => {
    const values = await returnValidIdAndToken(api);

    const newBlog = {
      author: 'Tester',
      title: 'testtestest',
      url: 'testurl'
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${values.token}`)
      .send(newBlog)
      .expect(201);

    const blogs = await blogsInDb();
    const blogToDelete = blogs[blogs.length - 1];

    await api
      .delete(`${url}/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${values.token}`)
      .expect(204);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogs.length - 1);

    const titles = blogsAtEnd.map(b => b.title);

    expect(titles).not.toContain(newBlog.title);

  });

  test('a blog cannot be deleted without authorization 401', async () => {
    const values = await returnValidIdAndToken(api);

    const newBlog = {
      author: 'Tester',
      title: 'testtestest',
      url: 'testurl'
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${values.token}`)
      .send(newBlog)
      .expect(201);

    const blogs = await blogsInDb();
    const blogToDelete = blogs[blogs.length - 1];

    await api
      .delete(`${url}/${blogToDelete.id}`)
      .expect(401);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogs.length);

    const titles = blogsAtEnd.map(b => b.title);

    expect(titles).toContain(newBlog.title);

  });
});

describe('updating a blog', () => {
  test('a blog can be updated 201', async () => {
    const values = await returnValidIdAndToken(api);

    const newBlog = {
      author: 'Tester',
      title: 'intialTitle',
      url: 'blogToUpdate.url',
    };

    const updatedValues = {
      title: 'modifiedTitle',
      likes: 10
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${values.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await blogsInDb();
    const blogToUpdate = blogs.filter(blog => blog.title === newBlog.title)[0];

    await api
      .put(`${url}/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${values.token}`)
      .send(updatedValues)
      .expect(200);

    const blogsAtEnd = await blogsInDb();
    const titles = blogsAtEnd.map(b => b.title);
    expect(titles).toContain(updatedValues.title);

  });
});

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('pwd', 10);
    const user = new User({ username: 'admin', name: 'super user', password: passwordHash });

    await user.save();
  });

  test('creation sucessful with a new username 201', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'testo',
      name: 'Test Okay',
      password: 'youneverguess'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.name);
    expect(usernames).toContain(newUser.name);
  });

  test('creation fail when username is already taken 400', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'admin',
      name: 'Test Fail',
      password: 'youneverguess'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('`username` to be unique');
    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe('login', () => {
  test('login with valid credentials succeed 201', async () => {
    const newUser = {
      username: 'tester',
      name: 'TestO',
      password: 'youneverguess'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/login')
      .send({
        username: newUser.username,
        password: newUser.password
      })
      .expect(200)
      .expect(/token/);

  });
  test('login with false credentials failed 401', async () => {
    await api
      .post('/api/login')
      .send({
        username: 'tester',
        password: 'wrong'
      })
      .expect(401)
      .expect(/invalid username or password/)
  });

  test('return a valid token succesfully 200', async () => {
    await User.deleteMany({});

    const newUser = {
      username: 'tester2',
      name: 'TestO',
      password: 'youneverguess'
    };

    const user = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const token = await api
      .post('/api/login')
      .send({
        username: newUser.username,
        password: newUser.password
      })
      .expect(200)
      .expect(/token/);

  });

  test('creation of a blog post succeed 201', async () => {

    const values = await returnValidIdAndToken(api);

    const newBlog = {
      author: 'Tester',
      url: 'http://blogsite.com/newBlog',
      title: 'how to create succesful blog'
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${values.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDb();
    const titles = blogs.map(b => b.title);
    expect(titles).toContain(newBlog.title);

  });
});


afterAll(() => {
  mongoose.connection.close();
});