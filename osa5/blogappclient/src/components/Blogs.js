import React, { useState } from 'react';
import PropTypes from 'prop-types';

const listStyle = {
  listStylePosition: 'inside',
  listStyleType: 'none',
  margin: 0,
  padding: 0
};

const RenderBlog = ({ blog, handleDelete, handleLike, user }) => {

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const doLike = () => {
    let newBlog = blog;
    newBlog.likes = newBlog.likes + 1;

    handleLike(blog.id, newBlog);
  };

  return (
    <div style={{ border: '1px solid black', padding: 5, marginTop: 10 }}>
      <ul key={blog.id} style={listStyle}>
        <li>
          {`${blog.title} ${blog.author}`}
          <button style={{ marginLeft: 5 }} onClick={() => toggleVisibility()}>{!visible ? 'view' : 'hide'}</button>
          {
            blog.user.username === user.username
              ?
              <button style={{ marginLeft: 5 }} onClick={() => handleDelete(blog.id)}>delete</button>
              : ''
          }
        </li>
        {
          visible
            ?
            <div style={{ display: !visible ? 'none' : '' }}>
              <li>{blog.url}</li>
              <li>
                {`likes ${blog.likes}`}
                <button style={{ marginLeft: 5 }} onClick={() => doLike()}>like</button>
              </li>
              <li>{blog.user.name}</li>
            </div>
            : ''
        }
      </ul>
    </div>
  );
};
const Blogs = ({ blogs, handleDelete, handleLike, user }) => {

  return (
    blogs.sort((a, b) => {
      return b.likes - a.likes;
    }).map(blog =>
      <RenderBlog
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