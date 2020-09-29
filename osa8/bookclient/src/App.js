import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import MessageHandler from './components/MessageHandler';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import { useApolloClient, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from './queries';

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {

    const includedIn = (set, object) => {
      set.some(b => b.id === object.id);
    };

    if (addedBook) {

      const dataInStore = client.readQuery({ query: ALL_BOOKS });

      if (!includedIn(dataInStore.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data:
            { allBooks: dataInStore.allBooks.concat(addedBook) }
        });
      };
    };
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.addedBook;
        updateCacheWith(addedBook);
    }
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();

  };

  useEffect(() => {
    if (localStorage.getItem('bookappuser')) {
      setToken(localStorage.getItem('bookappuser'))
    };
  }, [])

  return (
    <div>
      <div>
        {
          token
            ?
            <div>
              <button onClick={() => setPage('authors')}>authors</button>
              <button onClick={() => setPage('books')}>books</button>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommendations')}>recommendations</button>
              <button onClick={() => logout()}>logout</button>
              <MessageHandler message={message} setMessage={setMessage} />
            </div>
            :
            <div>
              <button onClick={() => setPage('authors')}>authors</button>
              <button onClick={() => setPage('books')}>books</button>
              <button onClick={() => setPage('login')}>login</button>
              <MessageHandler message={message} setMessage={setMessage} />
            </div>
        }
      </div>
      <div>
        <Authors
          show={page === 'authors'}
          setMessage={setMessage}
          token={token}
        />

        <Books
          show={page === 'books'}
          setMessage={setMessage}
        />

        <NewBook
          show={page === 'add'}
          setMessage={setMessage}
          updateCacheWith={updateCacheWith}
        />

        <LoginForm
          show={page === 'login'}
          setMessage={setMessage}
          setToken={setToken}
          setPage={setPage}
        />

        <Recommendations
          show={page === 'recommendations'}
          setMessage={setMessage}
        />

      </div>
    </div>
  );
};

export default App;
