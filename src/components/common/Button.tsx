import React from "react";

interface ButtonProps {
  title?: string;
  className?: string;
  textColor?: string;
  isSmall?: boolean; 
  icon?: React.ReactNode; 
  noHover?: boolean;
  noBackground?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  className = "",
  textColor = "text-primary-white",
  isSmall = false,
  icon,
  noHover = false,
  noBackground
}) => {
  return (
    <button
      className={`
        ${className}
        ${textColor}
        ${isSmall ? "p-2 rounded-lg" : "rounded-md h-12"} 

        w-full ${noHover ? "" : "hover:bg-primary-sky-blue"}
        ${noBackground ? "border-none" : "bg-primary-navy-blue"}
        cursor-pointer font-semibold shadow text-xs sm:text-sm 
      `}
    >
      {icon && <span className="text-sm">{icon}</span>} 
      {title}
    </button>
  );
};

export default Button;
