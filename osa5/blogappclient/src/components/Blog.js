import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlog } from '../redux/actioncreators';
import { Link } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';

const listStyle = {
  listStylePosition: 'inside',
  listStyleType: 'none',
  margin: 0,
  padding: 0
};

const Blog = ({ blog, user }) => {

  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete blog with title ${blog.title}`)) {
      dispatch(deleteBlog(blog.id));
    };
  };

  return (
    blog
      ?
      <ListGroup key={blog.id} style={listStyle}>
        <ListGroup.Item className="mt-1 data">
          <Link to={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link>
          {
            blog.user.username === user.username
              ?
              <Button
                className="btn-danger btn-sm float-right"
                onClick={() => handleDelete()}
              >
                delete
              </Button>
              : ''
          }
        </ListGroup.Item>
      </ListGroup >
      : ''
  );
};

export default Blog;