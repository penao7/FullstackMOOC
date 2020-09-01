import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (target) => {
    if (target.name === 'username') {
      setUsername(target.value);
    }
    else if (target.name === 'password')
      setPassword(target.value);
  };

  const handleFinalLogin = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <form>
      <div>
        <input
          id='username'
          name='username'
          placeholder='username'
          value={username}
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <input
          id='password'
          name='password'
          placeholder='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' onClick={(e) => handleFinalLogin(e)}>Submit</button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;
