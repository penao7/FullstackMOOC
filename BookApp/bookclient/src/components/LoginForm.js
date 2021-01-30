import React, { useEffect, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { LOGIN, GET_USER, ALL_BOOKS, ALL_AUTHORS } from '../queries';

const LoginForm = ({ setToken, setMessage, setPage, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [getUser] = useLazyQuery(GET_USER, { 
    fetchPolicy: "network-only",
  });

  const [getBooks] = useLazyQuery(
    ALL_AUTHORS,
  );

  const [getAuthors] = useLazyQuery(
    ALL_BOOKS,
  );

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setMessage(error.message)
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token)
      localStorage.setItem('bookappuser', token);
      setPage('authors');
      if(localStorage.getItem('bookappuser')) {
        getUser();
        getAuthors();
        getBooks()
      };
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  if (!show) {
    return ''
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
};

export default LoginForm;