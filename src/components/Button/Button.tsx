import React from "react";

interface ButtonProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => {
  return (
    <button className="text-primary-white w-full py-2 px-6 h-full bg-primary-navy-blue hover:bg-primary-sky-blue cursor-pointer rounded-md text-sm font-semibold shadow">
      {title}
    </button>
  );
};

export default Button;
