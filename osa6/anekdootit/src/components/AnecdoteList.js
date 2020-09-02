import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, insertMessage } from '../redux/actioncreators';

const AnecdoteList = () => {

  const dispatch = useDispatch();

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes;
    } else {
      return anecdotes.filter(anecdote => anecdote.content.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
    };
  });
  
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(insertMessage(`you voted '${anecdote.content}'`, 15));
  };

  return (
    <div>
      {
        anecdotes
          .sort((a, b) => { return b.votes - a.votes })
          .map(anecdote => (
            <div key={anecdote.id} style={{ margin: '5px', padding: '5px', border: '1px solid black' }}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          ))
      }
    </div>
  );
};

export default AnecdoteList;

