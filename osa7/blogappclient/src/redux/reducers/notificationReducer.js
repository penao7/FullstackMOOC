const reducer = (state = {info: '', error: ''}, action) => {
  console.log('ACTION', action);
  switch(action.type) {
    case 'SET_INFOMESSAGE': {
      return {info: action.data, error: ''};
    }
    case 'SET_ERRMESSAGE': {
      return {info: '', error: action.data};
    }
    case 'CLEAR_MESSAGE': {
      return state = '';
    }
    default:
      return state;
  };
};

export default reducer;