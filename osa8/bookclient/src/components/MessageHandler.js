import React from 'react';

const MessageHandler = ({ message, setMessage }) => {

  let timer;

  const setTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setMessage('');
    }, 10000)
  };

  if (message) {

    setTimer();

    return <div style={{ color: 'red' }}>{message}</div>

  };

  return '';


};

export default MessageHandler;