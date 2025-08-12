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
  iconBgColor = 'bg-settings-info-icons-bg',
  inputComponent: InputComponent = InputField,
  ...inputProps 
}) => {
  return (
    <div className="space-y-2"> {/* Removed className from this container */}
      <div className="flex items-start gap-3">
        <div className={`${iconBgColor} rounded-md p-1.5`}>
          <img src={iconSrc} alt={iconAlt} className="settings-button w-5 h-5" />
        </div>
        <Label className="text-settings-info-label-text text-sm font-normal -mt-[1px]">{label}</Label>
      </div>
      <div className="input-field ml-12 -mt-2">
        <InputComponent 
          name={name} 
          value={value} 
          className={className} // Pass className directly to the input
          {...inputProps} 
        />
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