import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ type, placeholder, style, onChange, value, name, required }) => {
  return (
    <Form.Control
      type={type}
      placeholder={placeholder}
      style={style}
      onChange={onChange}
      value={value}
      name={name}
      required={required}
    />
  );
};

export default Input;
