import React from 'react';
import './CustomButton.css';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const variantClass = `base__button_${variant}`;

  return (
    <button className={`base__button ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;