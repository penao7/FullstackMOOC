const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_BLOGS': {
      return action.data;
    }
    case 'ADD_BLOG': {
      return state.concat(action.data)
    }
    case 'UPDATE_BLOG': {
      const id = action.data.id;
      return state.map(b => b.id !== id ? b : action.data)
    };
    case 'DELETE_BLOG': {
      const id = action.data;
      return state.filter(b => b.id !== id);
    }
    case 'ADD_COMMENT': {
      const id = action.data.id;
      const blog = state.find(b => b.id === id);
      return state.map(b => b.id !== id ? b : {...b, comments: blog.comments.concat(action.data.addedComment.data)})
    }
    default:
      return state;
  }
}

export default reducer;