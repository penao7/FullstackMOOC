import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../redux/actioncreators';

const AnecdoteForm = ({ createAnecdote }) => {

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    if(content) {
      createAnecdote(content);
    } else {
      alert('no content specified');
    };
    e.target.anecdote.value = '';
  };

  return (
    <div>
      <form onSubmit={addAnecdote}>
        <label htmlFor='input'>Anecdote</label>
        <input name='anecdote' />
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default connect(null, { createAnecdote })(AnecdoteForm);



