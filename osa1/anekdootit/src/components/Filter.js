import React from 'react';
import { handleFilterChange } from '../redux/actioncreators';
import { useDispatch } from 'react-redux';

const Filter = () => {

  const dispatch = useDispatch();

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={(e) => dispatch(handleFilterChange(e.target.value))} />
    </div>
  );
};

export default Filter;