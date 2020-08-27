import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import BlogFrom from './components/BlogForm';
import Blogs from './components/Blogs';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification'
import LoginForm from './components/LoginForm';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  });
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
    };
  }, []);

  const getBlogs = () => {
    blogService.getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs);
      })
  };

  const updateBlog = (id, newBlog) => {
    blogService
      .update(id, newBlog)
      .then(newData => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : newData));
        messageHandler(`Contact ${newBlog.name} updated!`)
      })
      .then(setNewBlog({ name: '', number: '' }))
      .catch(err => messageHandler(null, JSON.stringify(err.response.data)))
  };

  const addBlog = (e) => {
    e.preventDefault();
    console.log(user);
    if (!newBlog.title) {
      return alert('title is missing')
    }
    else if (!newBlog.url) {
      return alert('url is missing')
    };

    return (
      blogs.some(blog => blog.title.toLocaleLowerCase() === newBlog.title.toLocaleLowerCase())
        ?
        window.confirm(`Contact ${newBlog.name} is already added to bloglist, replace the old number with a new one?`)
          ? updateBlog(blogs.find(blogs => blogs.title.toLocaleLowerCase() === newBlog.name.toLocaleLowerCase()).id, newBlog)
          : ""
        :
        blogService
          .create(newBlog, user.token)
          .then(returnedBlogs => {
            setBlogs(blogs.concat(returnedBlogs));
            messageHandler(`Blog with title ${returnedBlogs.title} added succesfully`)
            setNewBlog({ title: '', author: '', url: '' });
          })
          .catch(err => messageHandler(null, JSON.stringify(err.response.data)))
    );
  };

  const messageHandler = (success, err) => {
    setTimeout(() => {
      setMessage('')
    }, 5000);

    return (
      success
        ? setMessage({ status: true, message: success })
        : setMessage({ status: false, message: err })
    );
  };

  const handleDelete = (id) => {
    const blog = blogs.find(blog => blog.id === id);
    if (window.confirm(`Are you sure you want to delete blog with title ${blog.title}`)) {
      // blogService.setToken(user.token)
      blogService
        .deleteBlog(id)
        .then(res => {
          setBlogs(blogs.filter(blog => blog.id !== id));
          setFilteredBlogs('');
          messageHandler(`Blog with title ${blog.title} deleted`);
        })
        .catch(err => messageHandler(null, `Error deleting blog: ${err}`))
    };
  };

  const handleBlogInputChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleFilter = (e) => {
    if (typeof e.target.name !== 'string' || e.target.value.length === 0) {
      return setFilteredBlogs('');
    };
    const filteredList = blogs.filter(blog => blog.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
    setFilteredBlogs(filteredList);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      messageHandler('Succesfully logged in', null);
    } catch (exception) {
      messageHandler(null, 'wrong credentials')
    };
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      window.localStorage.removeItem('loggedBlogAppUser');
      setUser('');
      messageHandler('Succesfully logged out', null);
    };
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message
        ?
        <Notification message={message} />
        : ''
      }
      <h2>User login</h2>
      {
        user
          ?
          <div>
            <UserInformation user={user} handleLogout={handleLogout} />
            <BlogFrom
              handleInputChange={handleBlogInputChange}
              addBlog={addBlog}
              newBlog={newBlog}
            />
          </div>
          :
          <LoginForm
            setPassword={setPassword}
            setUsername={setUsername}
            handleLogin={handleLogin}
            username={username}
            password={password}
          />
      }
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <h2>Blogs</h2>
      <Blogs
        blogs={filteredBlogs ? filteredBlogs : blogs}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App

