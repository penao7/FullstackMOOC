
const reducer = (state = '', action) => {
  
  switch (action.type) {
    case 'FILTER': {
      return state = action.data
    }
    default:
      return state
  };
};

export default reducer
