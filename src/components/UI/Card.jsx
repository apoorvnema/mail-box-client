import React from 'react'
import color from '../../constants/Color'

const Card = ({children, customStyle}) => {
  return (
    <div style={{ ...styles.card, ...customStyle }}>
        {children}
    </div>
  )
}

export default Card

const styles = {
    card: {
        backgroundColor: color.white,
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
}