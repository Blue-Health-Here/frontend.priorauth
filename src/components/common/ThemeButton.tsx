import React from 'react';
import { FaChevronDown } from 'react-icons/fa6';

const ThemeButton: React.FC<any> = ({
    variant = 'primary',
    size = 'medium',
    children,
    icon: Icon,
    iconPosition = 'left',
    hasDropdown = false,
    disabled = false,
    onClick,
    className = '',
    ...props
}) => {
    // Base styles
    const baseStyles: any = 'inline-flex items-center justify-center h-full font-medium rounded-lg transition-all duration-200 focus:outline-none';

    // Size variants
    const sizeStyles: any = {
        small: 'px-3 py-1.5 text-sm gap-1.5',
        medium: 'px-4 py-2 text-sm gap-2',
        large: 'px-6 py-3 text-base gap-2.5'
    };

    // Variant styles with hover states
    const variantStyles: any = {
        primary: `
            bg-primary-navy-blue text-white border border-primary-navy-blue cursor-pointer
            disabled:bg-blue-300 disabled:border-blue-300 disabled:cursor-not-allowed
        `,
        secondary: `
            bg-quaternary-navy-blue text-primary-navy-blue border border-quaternary-navy-blue cursor-pointer
            disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed
        `,
        tertiary: `
            bg-white text-[#163066] border border-[#CBDAFF] cursor-pointer
    disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed
        `,
        disabled: `
            bg-light-stroke text-quaternary-white border border-light-stroke cursor-not-allowed
        `,
        warning: `
            bg-error-chip-bg-color text-error-clip border border-error-clip cursor-pointer
            disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed
        `
    };

    const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.replace(/\s+/g, ' ').trim();
    const isDisabled = disabled || variant === 'disabled';

    const handleClick = (e: any) => {
        if (!isDisabled && onClick) {
            onClick(e);
        }
    };

    return (
        <button
            className={buttonClasses}
            disabled={isDisabled}
            onClick={handleClick}
            {...props}
        >
            {/* Left Icon */}
            {Icon && iconPosition === 'left' && (
                <Icon size={size === 'small' ? 14 : size === 'large' ? 18 : 16} />
            )}

            {/* Button Text */}
            {children}

            {/* Right Icon */}
            {Icon && iconPosition === 'right' && (
                <Icon size={size === 'small' ? 14 : size === 'large' ? 18 : 16} />
            )}

            {/* Dropdown Arrow */}
            {hasDropdown && (
                <FaChevronDown size={size === 'small' ? 14 : size === 'large' ? 18 : 16} />
            )}
        </button>
    );
};

export default ThemeButton;