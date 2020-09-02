import anecdoteService from '../services/anecdotes';

// ANECDOTES

export const voteAnecdote = (anecdote) => async dispatch => {
  const result = await anecdoteService.like(anecdote);
  dispatch({
    type: 'VOTE',
    data: result
  });
};

export const createAnecdote = anecdote => async dispatch => {
  const newAnecdote = await anecdoteService.create(anecdote);
  dispatch({
    type: 'CREATE',
    data: {
      content: newAnecdote,
    }
  });
};

export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll();
  dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes
  });
};

// MESSAGES

let timer;

export const insertMessage = (message, time) => async dispatch => {
  const timeout = parseInt(`${time}${0}${0}`);

  const setTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(deleteMessage());
    }, parseInt(timeout));
  };

  setTimer();

  dispatch({
    type: 'INSERT',
    data: {
      message: message
    }
  })
};

export const deleteMessage = () => async dispatch => {
  dispatch({
    type: 'DELETE'
  });
};

// FILTER

export const handleFilterChange = (value) => async dispatch => {
  dispatch({
    type: 'FILTER',
    data: value
  });
};



