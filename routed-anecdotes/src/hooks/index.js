import { useState } from 'react';

export const useField = (type) => {

  const [value, setValue] = useState('');

  const reset = () => {
    setValue('');
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    type,
    value,  
    onChange,
    reset
  };
};