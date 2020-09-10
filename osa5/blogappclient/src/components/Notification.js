import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ info, error }) => {

  return (
    info
      ?
      <Alert variant='success'>
        {info}
      </Alert>
      : error
        ?
        <Alert variant='danger'>
          {error}
        </Alert>
        : ''
  );
};

export default Notification;