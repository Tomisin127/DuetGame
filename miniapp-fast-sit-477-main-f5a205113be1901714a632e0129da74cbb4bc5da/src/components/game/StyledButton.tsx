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
  const baseStyles = "font-bold transform transition-all duration-200 hover:scale-105 active:scale-95 rounded-2xl uppercase tracking-wider";
  
  const variantStyles: Record<string, string> = {
    primary: "bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-white shadow-2xl border-4 border-zinc-600",
    secondary: "bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800 text-white shadow-2xl border-4 border-zinc-500",
    outline: "bg-transparent border-4 border-zinc-600 hover:bg-zinc-800/50 active:bg-zinc-800/70 text-white shadow-xl",
  };

  const sizeStyles: Record<string, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-10 py-4 text-xl",
    xl: "px-14 py-6 text-2xl",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed hover:scale-100";

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
