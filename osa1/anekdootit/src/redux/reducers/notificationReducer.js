const reducer = (state = '', action) => {
  switch (action.type) {
    case 'INSERT': {
      return state = action.data.message;
    }
    case 'DELETE': {
      return '';
    }
    default:
      return state;
  };
};

export default reducer;