import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({ text, onClick, style, variant = "primary", type = "button" }) => {
  return (
    <BootstrapButton 
      style={style} 
      onClick={onClick} 
      variant={variant} 
      type={type}
    >
      {text}
    </BootstrapButton>
  );
};

export default Button;
