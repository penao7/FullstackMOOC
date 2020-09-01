import React, { useState, useEffect, useRef } from 'react';
import Filter from './components/Filter';
import BlogFrom from './components/BlogForm';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Toggable from './components/Toggable';

const UserInformation = ({ user, handleLogout }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <p>
        {`${user.name} logged in`}
      </p>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
};

const App = () => {

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const getBlogs = () => {
    blogService.getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs);
      });
  };

  const updateBlog = (id, newBlog) => {
    blogService
      .update(id, newBlog)
      .then(newData => {
        console.log(newData);
        setBlogs(blogs.map(blog => blog.id !== id ? blog : newData));
        getBlogs();
        messageHandler(`Contact ${newBlog.title} updated!`);
      })
      .catch(err => messageHandler(null, JSON.stringify(err.response.data)));
  };

  const addBlog = (newBlog) => {

    if (!newBlog.title) {
      return alert('title is missing');
    }
    else if (!newBlog.url) {
      return alert('url is missing');
    } else if (!newBlog.author) {
      return alert('author is missing');
    }

    blogFormRef.current.toggleVisibility();

    return (
      blogs.some(blog => blog.title.toLocaleLowerCase() === newBlog.title.toLocaleLowerCase())
        ?
        window.confirm(`Blog ${newBlog.title} is already added to bloglist, replace its content with new one?`)
          ? updateBlog(blogs.find(blog => blog.title.toLocaleLowerCase() === newBlog.title.toLocaleLowerCase()).id, newBlog)
          : ''
        :
        blogService
          .create(newBlog, user.token)
          .then(returnedBlog => {
            console.log(returnedBlog);
            getBlogs();
            messageHandler(`Blog with title ${returnedBlog.title} added succesfully`);
          })
          .catch(err => messageHandler(null, JSON.stringify(err.response.data)))
    );
  };

  const messageHandler = (success, err) => {

    let timer;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      setMessage('');
    }, 5000);

    if (success) {
      setMessage({ status: true, message: success });
    } else if (err) {
      setMessage({ status: false, message: err });
    }
  };

  const handleDelete = (id) => {
    const blog = blogs.find(blog => blog.id === id);
    if (window.confirm(`Are you sure you want to delete blog with title ${blog.title}`)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id));
          setFilteredBlogs('');
          messageHandler(`Blog with title ${blog.title} deleted`);
        })
        .catch(err => messageHandler(null, `Error deleting blog: ${err}`));
    }
  };

  const handleFilter = (e) => {
    if (typeof e.target.name !== 'string' || e.target.value.length === 0) {
      return setFilteredBlogs('');
    }
    const filteredList = blogs.filter(blog => blog.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
    setFilteredBlogs(filteredList);
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      messageHandler('Succesfully logged in', null);
    } catch (exception) {
      messageHandler(null, 'wrong username or password');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      window.localStorage.removeItem('loggedBlogAppUser');
      setUser('');
      messageHandler('Succesfully logged out', null);
    }
  };

  const handleLike = (id, newBlog) => {
    blogService
      .update(id, newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog));
        messageHandler(`Blog with title ${returnedBlog.title} liked succesfully`, null);
      })
      .catch(err => messageHandler(null, JSON.stringify(err.response.data)));
  };

  const blogFormRef = useRef();

  const blogForm = () => (
    <Toggable buttonLabel='new blog' ref={blogFormRef}>
      <h2>add a new blog</h2>
      <BlogFrom
        addBlog={addBlog}
      />
    </Toggable>
  );

  const loginForm = () => (
    <Toggable buttonLabel='login'>
      <h2>User login</h2>
      <LoginForm
        handleLogin={handleLogin}
      />
    </Toggable>
  );

  const messages = (message) => {
    return (
      message
        ?
        <Notification message={message} />
        : ''
    );
  };

  return (
    <div>
      <h2>Bloglist App</h2>
      {messages(message)}
      {
        !user
          ?
          loginForm()
          :
          <div>
            <UserInformation
              user={user}
              handleLogout={handleLogout}
            />
            {blogForm()}
            <Filter handleFilter={handleFilter} />
            <h2>Blogs</h2>
            <Blogs
              blogs={filteredBlogs ? filteredBlogs : blogs}
              handleDelete={handleDelete}
              handleLike={handleLike}
              user={user}
            />
          </div>
      }
    </div>

  );
};

export default App;

