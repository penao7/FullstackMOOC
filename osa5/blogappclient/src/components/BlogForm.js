import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ addBlog }) => {

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  });

  const handleInputChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleBlogAdd = (e) => {
    e.preventDefault();
    addBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: ''
    });
  };

  return (
    <div>
      <form>
        <div>
        title: <input value={newBlog.title} name='title' onChange={handleInputChange} />
        </div>
        <div>
        author: <input value={newBlog.author} name='author' onChange={handleInputChange} />
        </div>
        <div>
        url: <input value={newBlog.url} name='url' onChange={handleInputChange} />
        </div>
        <div style={{ marginTop: 10 }}>
          <button onClick={(e) => handleBlogAdd(e)}>add</button>
        </div>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
};



export default BlogForm;