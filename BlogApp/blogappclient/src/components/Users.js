import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Table } from 'react-bootstrap';

const Users = () => {

  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <div style={{ marginTop: '30px' }} className="container">
      <div className="col-12 col-md-6 offset-md-3">
        <Card>
          <Card.Body>
            <Card.Title
              as="h2"
              className="text-center"
            >
              Users
            </Card.Title>
            <Card.Text>
              <Table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Added blogs</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.username}>
                      <td>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                      </td>
                      <td>
                        {blogs.filter(b => b.user.id === user.id || b.user === user.id).length}
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </Table>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Users;