import React from 'react'

const Input = ({type, placeholder, style, onChange, value, name, required}) => {
    return (
        <input type={type} placeholder={placeholder} style={{...styles.input, ...style}} onChange={onChange} value={value} name={name} required={required}/>
    )
}

export default Input

const styles = {
    input: {
        padding: '12px 15px',
        borderRadius: '6px',
        border: '1px solid #d0d0d0',
        fontSize: '16px',
      },
}