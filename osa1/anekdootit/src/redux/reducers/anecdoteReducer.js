const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data);
    }
    case 'CREATE': {
      return [...state, action.data.content];
    }
    case 'INIT_ANECDOTES': {
      return action.data;
    }
    default:
      return state;
  };
};

export default reducer

