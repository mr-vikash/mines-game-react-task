import React from 'react'

const Button = ({name, onClick}) => {
    return (
    <button
      className="checkout-button"
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default Button;