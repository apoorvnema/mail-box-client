import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({ text, onClick, style, variant = "primary" }) => {
  return (
    <BootstrapButton 
      style={{ ...style }} 
      onClick={onClick}
      variant={variant}
    >
      {text}
    </BootstrapButton>
  );
};

export default Button;
