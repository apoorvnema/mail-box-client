import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ type, placeholder, onChange, value, name, required }) => {
  return (
    <Form.Group controlId={name} className="mb-1">
      <Form.Label>{placeholder}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        required={required}
      />
      <Form.Control.Feedback type="invalid">
        Please provide a valid {name}.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
