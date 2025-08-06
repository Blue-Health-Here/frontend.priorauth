import React, { useState, useEffect } from 'react';
import { useField, useFormikContext } from 'formik';

type Option = {
    label: string;
    value: string;
};

type AutocompleteFieldProps = {
    name: string;
    options: Option[];
    placeholder?: string;
};

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({ name, options, placeholder }) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();
    const [inputValue, setInputValue] = useState(field.value || '');
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (inputValue.trim() === '') {
            setFilteredOptions([]);
            return;
        }

        const lowerInput = inputValue.toLowerCase();
        const filtered = options.filter((opt) =>
            opt.label.toLowerCase().includes(lowerInput)
        );

        setFilteredOptions(filtered);
    }, [inputValue, options]);

    const handleSelect = (option: Option) => {
        setInputValue(option.label);
        setFieldValue(name, option.value);
        setShowDropdown(false);
    };

    return (
        <>
            <input
                type="text"
                id={name}
                name={name}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                placeholder={placeholder}
                className="w-full h-10 mb-1 border border-light-stroke rounded-lg px-4 pr-12 font-secondary text-primary-black text-sm font-medium placeholder:text-tertiary-black placeholder:text-sm focus:outline-none focus:border-gray-400 transition-colors duration-200"
            />

            {showDropdown && filteredOptions.length > 0 && (
                <ul className="absolute z-10 pl-8 right-0 left-0">
                    <div className='bg-primary-white border border-light-stroke mt-1 w-full max-h-44 overflow-y-auto rounded-lg theme-shadow'>
                        {filteredOptions.map((opt) => (
                            <li
                                key={opt.value}
                                className="px-3 py-2 hover:bg-quaternary-navy-blue text-primary-black cursor-pointer"
                                onMouseDown={() => handleSelect(opt)}
                            >
                                {opt.label}
                            </li>
                        ))}
                    </div>
                </ul>
            )}

            {meta.touched && meta.error && (
                <p className="text-red-500 text-xs font-secondary">
                    {meta.error}
                </p>
            )}
        </>
    );
};

export default AutocompleteField;
