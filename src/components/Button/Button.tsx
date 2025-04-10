import React from "react";

interface ButtonProps {
  title: string;
  className?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  className = "",
  textColor = "text-primary-white",
}) => {
  return (
    <button
      className={`
        ${className}
        ${textColor}
        py-4 px-8 h-full
        bg-primary-navy-blue hover:bg-primary-sky-blue
        cursor-pointer rounded-md text-sm font-semibold shadow
      `}
    >
      {title}
    </button>
  );
};

export default Button;
