import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../redux/actioncreators';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import BlogForm from './BlogForm';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';

const Navigation = ({ user }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      window.localStorage.removeItem('loggedBlogAppUser');
      dispatch(deleteUser());
      history.push('/');
    };
  };

  const users = useSelector(({ users }) => users);
  const loggedUser = users.find(u => u.username === user.username);

  return (
    user
      ?
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/"><b>B</b></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Blogs</Nav.Link>
          <Nav.Link as={Link} to="/users">Users</Nav.Link>
        </Nav>
        <Navbar.Text>
          Logged in as
        <Link className="ml-2" to={`/users/${loggedUser ? loggedUser.id : ''}`}>
            {user.username}
          </Link>
        </Navbar.Text>
        <NavDropdown alignRight id="nav-dropdown" title=''>
          <NavDropdown.Item id="logout" onClick={handleLogout}>
            Logout
          </NavDropdown.Item>
          <NavDropdown.Item>
            <BlogForm />
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar>
      :
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <Navbar.Brand href="#home"><b>B</b></Navbar.Brand>
        <Nav>
          <Nav.Link>
            <LoginForm />
          </Nav.Link>
          <Navbar.Text>
            <Link to={`/users/${loggedUser ? loggedUser.id : ''}`}>
              {user.username}
            </Link>
          </Navbar.Text>
        </Nav>
      </Navbar>
  );
};

export default Navigation;

