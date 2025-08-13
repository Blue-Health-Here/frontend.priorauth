import React, { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi';
// import { icdCodes } from '@/utils/constants';
import ThemeButton from '../ThemeButton';

const ICD10Selector: React.FC<any> = ({ name, icdCodes }) => {
    const [field, meta, helpers] = useField(name);
    const [isOpen, setIsOpen] = useState(false);
    const [showCustomForm, setShowCustomForm] = useState(false);
    const [customCode, setCustomCode] = useState('');
    const selectedCode = field.value || null;
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleCodeSelect = (code: any) => {
        helpers.setValue(code.code);
        setIsOpen(false); // Close dropdown after selection
    };

    const handleAddCustomCode = () => {
        if (customCode.trim()) {
            const newCode = {
                code: customCode.trim(),
                description: '', // Custom codes might not have descriptions
                isCustom: true
            };

            helpers.setValue(newCode.code);
            setCustomCode('');
            setShowCustomForm(false);
            setIsOpen(false); // Close dropdown after selection
        }
    };

    const isCodeSelected = (code: any) => {
        return selectedCode && selectedCode === code.code;
    };

    return (
        <div className="w-full">
            {/* Dropdown trigger */}
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between h-11 bg-primary-white border border-light-stroke rounded-lg px-3 py-2 text-left focus:outline-none"
                >
                    {selectedCode ? <span className="text-primary-black text-sm">{selectedCode}</span> : <span className="text-primary-black text-sm">Select ICD-10 Codes</span>}
                    {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </button>

                {/* Dropdown content */}
                {isOpen && (
                    <div className="absolute z-10 w-full bottom-12 mt-1 bg-primary-white border border-light-stroke rounded-lg theme-shadow p-2">
                        <div className="max-h-60 overflow-y-auto">
                            {/* Predefined codes */}
                            {icdCodes.map((code: any) => (
                                <div key={code.code} className="">
                                    <label className="flex items-start px-3 py-2 hover:bg-status-bg-sky-blue rounded-lg peer-disabled:cursor-not-allowed cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`${name}-radio`}
                                            disabled={showCustomForm}
                                            checked={isCodeSelected(code)}
                                            onChange={() => handleCodeSelect(code)}
                                            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <div className="ml-3 flex-1">
                                            <div className="font-medium text-sm text-gray-900">{code.code}</div>
                                            <div className="text-xs text-gray-600 mt-1">{code.description}</div>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Add custom code section */}
                        <div className="mt-2">
                            {!showCustomForm ? (
                                <button
                                    type="button"
                                    onClick={() => setShowCustomForm(true)}
                                    className="w-full flex items-center px-3 py-2 rounded-lg bg-status-bg-sky-blue text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                    <FiPlus size={16} className="mr-2" />
                                    Add custom code
                                </button>
                            ) : (
                                <div className="flex gap-2 items-center h-10 w-full">
                                    <input 
                                        type="text" 
                                        value={customCode} 
                                        placeholder="Enter ICD-10 code (e.g. A11.9)"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddCustomCode();
                                            }
                                        }}
                                        onChange={(e) => setCustomCode(e.target.value)} 
                                        className="text-xs !border border-light-stroke focus:outline-none !px-3 !py-2 w-full h-full rounded-lg" autoFocus />
                                    <ThemeButton type="button" onClick={handleAddCustomCode} className="w-full sm:w-20 rounded-lg" variant="primary">
                                        Add
                                    </ThemeButton>
                                    <ThemeButton 
                                        onClick={() => {
                                            setShowCustomForm(false);
                                            setCustomCode('');
                                        }} 
                                        type="button" 
                                        className="w-full sm:w-40 rounded-lg cursor-pointer border border-light-stroke max-w-max" variant="outline">
                                        Cancel
                                    </ThemeButton>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Error display */}
            {meta.touched && meta.error && (
                <p className="text-red-500 text-xs font-secondary">
                    {meta.error}
                </p>
            )}
        </div>
    );
};

export default ICD10Selector;