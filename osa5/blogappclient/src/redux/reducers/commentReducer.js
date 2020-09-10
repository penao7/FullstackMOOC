const reducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_COMMENT': {
      return action.data
    }
    default:
      return state
  };
};

export default reducer;