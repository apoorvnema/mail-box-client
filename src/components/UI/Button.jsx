import React from 'react'
import color from '../../constants/Color'

const Button = ({text, onClick, style}) => {
  return (
    <button style={{...styles.button, ...style}} onClick={onClick}>{text}</button>
  )
}

export default Button

const styles = {
    button: {
        width: '100%',
        padding: '12px 15px',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: color.primary,
        color: '#fff',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },   
}