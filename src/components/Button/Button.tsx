import React from "react";

interface ButtonProps {
  title?: string;
  className?: string;
  textColor?: string;
  isSmall?: boolean; 
  icon?: React.ReactNode; 
  noHover?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  className = "",
  textColor = "text-primary-white",
  isSmall = false,
  icon,
  noHover = false,
}) => {
  return (
    <button
      className={`
        ${className}
        ${textColor}
        ${isSmall ? "p-2 rounded-lg" : "text-xs sm:text-sm rounded-md h-12"} 

        bg-primary-navy-blue w-full ${noHover ? "" : "hover:bg-primary-sky-blue"}
        cursor-pointer font-semibold shadow text-xs sm:text-sm 
      `}
    >
      {icon && <span className="text-xs md:text-sm">{icon}</span>} 
      {title}
    </button>
  );
};

export default Button;
