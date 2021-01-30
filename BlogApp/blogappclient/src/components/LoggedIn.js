import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBlogs, getUsers } from '../redux/actioncreators';
import NavRouter from './Router';

const LoggedIn = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <NavRouter />
    </div>
  );
};

export default LoggedIn;