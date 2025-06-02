import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, id }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="hidden"
      checked={checked}
      onChange={onChange}
      id={id}
    />
    <span
      className={`w-[18px] h-[18px] flex items-center justify-center rounded-[4px] border-2 transition-all duration-200 ${
        checked
          ? 'bg-primary-sky-blue border-primary-sky-blue' 
          : 'bg-transparent border-secondary-black' 
      }`}
    >
      {checked && (
        <img src="/check-box-icon.svg" alt="check" className='h-3 w-3' />
      )}
    </span>
  </label>
  );
};

export default CustomCheckbox;
