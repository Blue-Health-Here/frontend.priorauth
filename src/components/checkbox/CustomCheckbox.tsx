import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="hidden"
      checked={checked}
      onChange={onChange}
    />
    <span
      className={`w-[20px] h-[20px] flex items-center justify-center rounded-[4px] border-2 transition-all duration-200 ${
        checked
          ? 'bg-primary-sky-blue border-primary-sky-blue' 
          : 'bg-transparent border-secondary-black' 
      }`}
    >
      {checked && (
        <svg
          className="w-[12px] h-[12px] text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  </label>
  );
};

export default CustomCheckbox;
