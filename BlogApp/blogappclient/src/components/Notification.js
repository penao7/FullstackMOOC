import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ info, error }) => {

  return (
    info
      ?
      <Alert id="note-success" variant='success'>
        {info}
      </Alert>
      : error
        ?
        <Alert id="note-error" variant='danger'>
          {error}
        </Alert>
        : ''
  );
};

export default Notification;