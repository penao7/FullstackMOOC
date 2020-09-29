import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_BOOKS_BY_GENRE } from '../queries';

const Recommendations = ({ show }) => {

  const [genre, setGenre] = useState('');

  const user = useQuery(GET_USER,
    {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: 'true',
      onCompleted: () => {
        if (user.data.me !== null) {
          setGenre(user.data.me.favoriteGenre)
        }
      }
    }
  );

  const books = useQuery(GET_BOOKS_BY_GENRE, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: 'true',
    variables: { genre: genre }
  });

  if (!show) {
    return ''
  };

  console.log(books);

  return (
    books.data.allBooks 
    ?
      <div>
        <h1>recommendations</h1>
        <div>
          <p>recommendations given by your favorite genre <strong>{genre}</strong></p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.data.allBooks.map(b => (
                <tr key={b.id}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      </div>
      : ""
  );
}

export default Recommendations;