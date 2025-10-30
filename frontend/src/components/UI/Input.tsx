import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg 
      focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white text-gray-800 ${className}`}
      {...props}
    />
  );
};

export default Input;
