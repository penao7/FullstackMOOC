import React from 'react';

const Blogs = ({ blogs, handleDelete }) => {
  return (
    blogs.map(blog =>
      <p key={blog.id}>
        {blog.title}{' '}
        {blog.url}{' '}
        {blog.author}{' '}
        <button onClick={() => handleDelete(blog.id)}>delete</button>
      </p>
    )
  );
};

export default Blogs;