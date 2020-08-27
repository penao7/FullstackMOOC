import React from 'react';

const LoginForm = ({ setPassword, setUsername, username, password, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          name='username'
          placeholder='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      <input
          name='password'
          placeholder='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />      
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
