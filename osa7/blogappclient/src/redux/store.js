import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import filterReducer from './reducers/filterReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';
import commentsReducer from './reducers/commentReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  filter: filterReducer,
  user: userReducer,
  users: usersReducer,
  comments: commentsReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;