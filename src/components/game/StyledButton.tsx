'use client'

import type { FC, ReactNode } from 'react';

interface StyledButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  className?: string;
}

const StyledButton: FC<StyledButtonProps> = ({ 
  onClick, 
  disabled = false, 
  variant = 'primary',
  size = 'lg',
  children,
  className = '',
}) => {
  const baseStyles = "font-medium transition-smooth cursor-pointer uppercase tracking-widest select-none";
  
  const variantStyles: Record<string, string> = {
    primary: "bg-white text-black hover:bg-gray-200 active:bg-gray-300 border border-white shadow-sm",
    secondary: "bg-black text-white hover:bg-gray-900 active:bg-black border border-white shadow-sm",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black active:bg-gray-200",
  };

  const sizeStyles: Record<string, string> = {
    sm: "px-6 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-12 py-4 text-base",
    xl: "px-16 py-5 text-lg",
  };

  const disabledStyles = "opacity-40 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? disabledStyles : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default StyledButton;
