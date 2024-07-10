import { TextField } from '@mui/material';
import React, { useState } from 'react';

const NumberInput = ({ defaultValue = '', ...props }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setValue(e.target.value);
    }
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      inputProps={{ ...props.inputProps, inputMode: 'numeric', pattern: '[0-9]*' }}
      {...props}
    />
  );
};

export default NumberInput;
