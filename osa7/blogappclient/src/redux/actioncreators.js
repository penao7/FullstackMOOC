import axios from 'axios';
const baseUrl = '/api/blogs';

let timer;

export const setInfoMessage = (message) => (dispatch) => {
  const setTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      })
    }, 3000);
  };

  setTimer();

  dispatch({
    type: 'SET_INFOMESSAGE',
    data: message
  })
};

export const setErrMessage = (message) => (dispatch) => {
  const setTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      })
    }, 3000);
  };

  setTimer();

  dispatch({
    type: 'SET_ERRMESSAGE',
    data: message
  });
};

export const getBlogs = () => async (dispatch) => {
  const blogs = await axios.get(baseUrl);
  dispatch({
    type: 'GET_BLOGS',
    data: blogs.data
  });
};

export const addBlog = (newBlog) => async (dispatch) => {

  const user = JSON.parse(localStorage.getItem('loggedBlogAppUser'));
  const config = {
    headers: {
      Authorization: `bearer ${user.data.token}`
    }
  };

  const blog = await axios.post(baseUrl, newBlog, config);

  console.log(blog);

  dispatch({
    type: 'ADD_BLOG',
    data: blog.data
  });
};

export const updateBlog = (id, newBlog) => async (dispatch) => {

  const token = JSON.parse(localStorage.getItem('loggedBlogAppUser'));

  const config = {
    headers: {
      Authorization: `bearer ${token}`
    }
  };

  const updatedBlog = await axios.put(`${baseUrl}/${id}`, newBlog, config);

  dispatch({
    type: 'UPDATE_BLOG',
    data: updatedBlog.data
  });

};

export const deleteBlog = (id) => async (dispatch) => {

  const user = JSON.parse(localStorage.getItem('loggedBlogAppUser'));
  const config = {
    headers: {
      Authorization: `bearer ${user.data.token}`
    }
  };

  try {
    await axios.delete(`${baseUrl}/${id}`, config);

    dispatch({
      type: 'DELETE_BLOG',
      data: id
    });
    dispatch(setInfoMessage('blog deletion succesful'));

  } catch (exception) {
    dispatch(setErrMessage(exception.message))
  }
};

export const setFilter = (filter) => async (dispatch) => {
  dispatch({
    type: 'SET_FILTER',
    data: filter
  })
};

export const loginUser = (values) => async (dispatch) => {
  try {
    const user = await axios.post(`/api/login`, values)

    if (user) {
      dispatch(setUser(user.data));
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );
      dispatch(setInfoMessage(`logged in as ${user.data.username}`));
    } else {
      dispatch(setErrMessage('bad type of credentials'))
    }
  } catch (exception) {
    dispatch(setErrMessage('bad type of credentials'));
    console.log(exception.message);
  }
};

export const setUser = (user) => async (dispatch) => {
  dispatch({
    type: 'SET_USER',
    data: user
  })
};

export const deleteUser = () => async (dispatch) => {
  dispatch(setInfoMessage('succesfully logged out'));
  dispatch({
    type: 'DELETE_USER'
  })
};

export const getUsers = () => async (dispatch) => {
  try {
    const users = await axios.get('/api/users');
    dispatch({
      type: 'GET_USERS',
      data: users.data
    });
  } catch (exception) {
    dispatch(setErrMessage(exception.message));
  }

};

export const addComment = (id, comment) => async (dispatch) => {

  try {
    const addedComment = await axios.post(`${baseUrl}/${id}/comments`, comment);

    dispatch({
      type: 'ADD_COMMENT',
      data: { id, addedComment }
    })
  } catch (exception) {
    console.log(exception.message);
  }

};
