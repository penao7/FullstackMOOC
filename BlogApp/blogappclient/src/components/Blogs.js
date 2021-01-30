import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, user }) => {

  return (
    blogs.sort((a, b) => {
      return b.likes - a.likes;
    }).map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
      />
    )
  );
};

export default Blogs;