import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actioncreators';
import { useField } from '../hooks';
import { Form, Button, Modal } from 'react-bootstrap';

const LoginForm = () => {

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow(!show);
  };

  const username = useField('text');
  const password = useField('password');

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = { username: username.value, password: password.value }
    dispatch(loginUser(credentials));
    toggleModal();
  };

  const finalInput = (input, id) => {
    const { reset, ...props } = input;
    return <Form.Control id={id} {...props} />
  };

  return (
    <div className="container">
      <div className="col-12">
        <span onClick={toggleModal}>
          Login
        </span>

        <Modal show={show} onHide={toggleModal}>
          <Modal.Title className="text-center">
            User Login
          </Modal.Title>
          <Modal.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                {finalInput(username, "username")}
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                {finalInput(password, "password")}
              </Form.Group>
              <Button onClick={toggleModal} variant="secondary" type="submit">
                Cancel
              </Button>
              <Button onClick={handleLogin} id="submit" className="float-right" variant="primary" type="submit">
                Submit
            </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default LoginForm;
