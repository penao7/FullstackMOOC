import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Toggable = forwardRef((props, ref) => {

  Toggable.displayName = 'Toggable';

  const [visible, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: visible ? '' : 'none' }}>
        {props.children}
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={() => toggleVisibility()}>
          {visible ? 'hide' : props.buttonLabel}
        </button>
      </div>
    </div>
  );

});

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default Toggable;