import React, { useState } from 'react';

const listStyle = {
  listStylePosition: 'inside',
  listStyleType: 'none',
  margin: 0,
  padding: 0
};

const Blog = ({ blog, handleDelete, handleLike, user }) => {

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
    <div className='blog' style={{ border: '1px solid black', padding: 5, marginTop: 10 }}>
      <ul key={blog.id} style={listStyle}>
        <li className="data"> 
            {`${blog.title} ${blog.author}`}
          <button style={{ marginLeft: 5 }} onClick={() => toggleVisibility()}>{!visible ? 'view' : 'hide'}</button>
          {
            blog.user.username === user.username
              ?
              <button style={{ marginLeft: 5 }} onClick={() => handleDelete(blog.id)}>delete</button>
              : ''
          }
        </li>
        <div className='toggableContent' style={{ display: !visible ? 'none' : '' }}>
          <li>{blog.url}</li>
          <li className="likes">
            {`likes ${blog.likes}`}
            <button style={{ marginLeft: 5 }} onClick={() => doLike()}>like</button>
          </li>
          <li>{blog.user.name}</li>
        </div>
      </ul>
    </div>
  );
};

export default Blog;