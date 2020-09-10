import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/actioncreators';

const Filter = () => {

  const dispatch = useDispatch();

  const handleFilter = (e) => {
    const filter = e.target.value;
    dispatch(setFilter(filter));
  };

  return (
    <div>
      <p>filter shown with: <input onChange={(e) => handleFilter(e)} /></p>
    </div>
  );
};

export default Filter;
