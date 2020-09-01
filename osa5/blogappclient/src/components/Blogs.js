import React from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';

const Blogs = ({ blogs, handleDelete, handleLike, user }) => {

  return (
    blogs.sort((a, b) => {
      return b.likes - a.likes;
    }).map(blog =>
      <Blog
        key={blog.title}
        blog={blog}
        handleDelete={handleDelete}
        handleLike={handleLike}
        user={user}
      />
    )
  );
};

Blogs.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};



export default Blogs;