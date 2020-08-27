import React from 'react';

const BlogForm = ({ handleInputChange, newBlog, addBlog}) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input value={newBlog.title} name='title' onChange={handleInputChange} />
      </div>
      <div>
        author: <input value={newBlog.author} name='author' onChange={handleInputChange} />
      </div>
      <div>
        url: <input value={newBlog.url} name='url' onChange={handleInputChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default BlogForm