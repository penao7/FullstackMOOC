import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../redux/actioncreators';

const UserInformation = ({ user }) => {



  return (
    <div style={{ marginBottom: 20 }}>
      <p>
        {`${user.name} logged in`}
      </p>
      
    </div>
  );
};

export default UserInformation;