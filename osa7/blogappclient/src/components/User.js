import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Users = ({ user }) => {

  const blogs = useSelector(({ blogs }) => blogs);

  return (
    user
      ?
      <div style={{ marginTop: '30px' }} className="container">
        <div className="col-12 col-md-6 offset-md-3">
          <Card>
            <Card.Body>
              <Card.Title
                as="h2"
                className="text-center"
              >
                {user.username}
              </Card.Title>
              <Card.Text>
                Added blogs
                {blogs.filter(b => b.user.username === user.username).map(b => (
                  <li><Link to={`/blogs/${b.id}`}>{b.title}</Link></li>
                ))}


              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      : ''
  );

};

export default Users;