import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK, ALL_AUTHORS } from '../queries';


const NewBook = ({ show, setMessage, updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [genres, setGenres] = useState([])
  const [genreInput, setGenreInput] = useState('');

  const [createBook] = useMutation(CREATE_BOOK, {
    notifyOnNetworkStatusChange: 'true',
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
      setMessage(error.message)
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    },
  });

if (!show) {
  return ''
};

const submit = async (event) => {
  event.preventDefault();

  const published = Number(year);

  createBook({ variables: { title, author, published, genres } });

  setTitle('');
  setAuthor('');
  setYear('');
  setGenres([]);
};

const addGenre = (e) => {
  e.preventDefault();
  setGenres(genres.concat(genreInput));
};

return (
  <div>
    <h2>New book</h2>
    <form onSubmit={submit}>
      <div>
        title <input value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author <input value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        published <input value={year}
          onChange={({ target }) => setYear(target.value)}
        />
      </div>
      <div>
        <input onChange={({ target }) => setGenreInput(target.value)} />
        <button onClick={(e) => addGenre(e)}>add</button>
        <div>genres: {genres.join(", ")}</div>
      </div>
      <button type='submit'>add!</button>
    </form>
  </div>
)
}

export default NewBook;