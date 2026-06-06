import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false,
  icon: Icon,
  fullWidth = false
}) => {
  const baseStyles = "px-8 py-3 rounded-none tracking-widest uppercase text-[10px] font-bold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-premium-dark text-white hover:bg-premium-accent active:scale-95",
    secondary: "bg-white text-premium-dark border border-premium-dark/10 hover:bg-premium-dark hover:text-white active:scale-95",
    outline: "bg-transparent text-premium-dark border border-premium-dark hover:bg-premium-dark hover:text-white active:scale-95",
    ghost: "bg-transparent text-premium-dark/60 hover:text-premium-dark",
    accent: "bg-premium-accent text-white hover:bg-premium-dark active:scale-95"
  };

  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
      {Icon && <Icon size={14} strokeWidth={2} />}
    </motion.button>
  );
};

export default Button;
