// components/FormField.jsx
import InputField from '@/components/common/form/InputField';
import { Label } from '@/components/common/Label';
import PropTypes from 'prop-types';
import React from 'react';

const FormField: React.FC<any> = ({ 
  iconSrc, 
  iconAlt, 
  label, 
  name, 
  value, 
  className = '',
  iconBgColor = 'bg-quaternary-navy-blue',
  inputComponent: InputComponent = InputField,
  ...inputProps 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-start gap-3"> {/* Changed from items-center to items-start */}
        <div className={`${iconBgColor} rounded-md p-1.5`}> {/* Added mt-[2px] */}
          <img src={iconSrc} alt={iconAlt} className="w-5 h-5" />
        </div>
        <Label className="text-quaternary-white text-sm font-normal -mt-[1px]">{label}</Label> {/* Added -mt-[1px] */}
      </div>
      <div className="ml-12 -mt-2">
        <InputComponent name={name} value={value} {...inputProps} />
      </div>
    </div>
  );
};

FormField.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  iconAlt: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  className: PropTypes.string,
  iconBgColor: PropTypes.string,
  inputComponent: PropTypes.elementType
};

export default FormField;