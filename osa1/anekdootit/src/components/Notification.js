import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const Notification = (props) => {
  const notification = props.notification;
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: 10,
    height: '10px'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  );
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;