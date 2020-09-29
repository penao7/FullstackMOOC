import React, { useState, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { FIND_BOOK, ALL_BOOKS, GET_GENRES, GET_BOOKS_BY_GENRE } from '../queries';

const Books = ({ show, setMessage }) => {

  const [getBook, singleBookResult] = useLazyQuery(FIND_BOOK);
  const [getBooksByGenre, booksByGenreResult] = useLazyQuery(GET_BOOKS_BY_GENRE);
  const [book, setBook] = useState(null);
  const [genres, setGenres] = useState([]);
  const [genreBooks, setGenreBooks] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const books = useQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error);
    }
  });

  const genreList = useQuery(GET_GENRES);

  if (genreList.data) {
    genreList.data.allBooks.forEach(g =>
      g.genres.forEach(g => genres.some(gnr => gnr === g) ? "" : setGenres(genres.concat(g))))
  };

  const showBook = (title) => {
    getBook({ variables: { title: title } })
  };

  useEffect(() => {
    if (singleBookResult.data) {
      setBook(singleBookResult.data.allBooks[0])
    };
  }, [singleBookResult])

  useEffect(() => {
    if (booksByGenreResult.data) {
      setGenreBooks(booksByGenreResult.data.allBooks)
    };
  }, [booksByGenreResult])

  const filterByGenre = async (event) => {
    const genre = event.target.value;
    if (genre === '') {
      return setSelectedGenre('')
    };
    setSelectedGenre(genre)
    event.preventDefault();
    getBooksByGenre({ variables: { genre } })
  };

  if (!show) {
    return ''
  };

  if (books.loading || !books.data) {
    return <div>Loading . . .</div>
  };

  if (book) {
    return (
      <div>
        <h2>{book.title}</h2>
        <div>{book.author.name}</div>
        <div>{book.published}</div>
        <div>{book.genres.map(g => g).join(", ")}</div>
        <button onClick={() => setBook('')}>close</button>
      </div>
    );
  };

  if (genreBooks && selectedGenre !== '') {
    return (
      <div>
        <h2>Books by genre {selectedGenre}</h2>
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
            {genreBooks.map(b => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
                <td><button onClick={() => showBook(b.title)}>show</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
        {
          genres
            ?
            <div>
              filter by genre: {' '}
              {
                <select
                  value={selectedGenre} onChange={(e) => filterByGenre(e)}
                >
                  <option value={''}>all</option>
                  {
                    genres.map(g =>
                      <option key={g} value={g}>{g}</option>
                    )
                  }
                </select>
              }
            </div>

            : ""
        }
      </div>
    );
  }

  return (
    <div>
      <h2>All books</h2>
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
              <td><button onClick={() => showBook(b.title)}>show</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>
      {
        genres
          ?
          <div>
            filter by genre: {' '}
            {
              <select
                value={selectedGenre} onChange={(e) => filterByGenre(e)}
              >
                <option value={null}>all</option>
                {
                  genres.map(g =>
                    <option key={g} value={g}>{g}</option>
                  )
                }
              </select>
            }
          </div>

          : ""
      }
    </div>
  )
};

export default Books;