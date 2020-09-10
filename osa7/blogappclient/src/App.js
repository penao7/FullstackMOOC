import React, { useEffect } from 'react';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actioncreators';
import LoggedIn from './components/LoggedIn';
import Navigation from './components/Navigation';

const App = () => {

  const dispatch = useDispatch();
  const info = useSelector(({ notification }) => notification.info);
  const error = useSelector(({ notification }) => notification.error);
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user.data));
    }
  }, [dispatch]);

  return (
    <div className="container">
      <Navigation user={user} />
      <div>
        <div className="col-12">
          <h2 className="text-center mt-4">Bloglist App</h2>
          <Notification info={info ? info : ''} error={error ? error : ''} />
          {
            !user
              ?
              <div className="text-center mt-5">Plese log in to get access to the app</div>
              :
              <LoggedIn user={user} />
          }
        </div>
      </div>
    </div>
  );
};

export default App;

