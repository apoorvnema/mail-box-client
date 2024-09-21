import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import color from '../../constants/Color';

const Card = ({ children, style }) => {
  return (
    <BootstrapCard style={{ ...style }}>
      <BootstrapCard.Body>
        {children}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;
