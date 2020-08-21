import React from 'react';

const Notification = ({ message }) => {

  const notificationErrStyles = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    width: '700px'
  };

  const notificationSuccessStyles = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    width: '700px'
  };

  return (
    message.status
      ?
      <div style={notificationSuccessStyles}>
        <h3>{message.message}</h3>
      </div>
      :
      <div style={notificationErrStyles}>
        <h3>{message.message}</h3>
      </div>
  );
};

export default Notification;