    import React, { useRef, useEffect } from 'react';

    interface MenuItem {
    label: string;
    onClick: () => void;
}

interface MoreOptionsMenuProps {
    items: MenuItem[];
    isOpen: boolean;
    onClose: () => void;
    headerText?: string
    }

    const MoreOptionsMenu: React.FC<MoreOptionsMenuProps> = ({ items, isOpen, onClose, headerText = "Options" }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            onClose();
        }
        };
        if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        } else {
        document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="absolute right-0 w-40 sm:w-50  border border-light-stroke bg-primary-white rounded-lg shadow-lg z-50" ref={dropdownRef}>
            <div className="text-left px-4 py-2 text-xs sm:text-sm lg:text-base text-primary-white border-b border-light-stroke bg-primary-sky-blue rounded-t-lg">
                {headerText}
            </div>
        <ul className="pb-3">
            {items.map((item, index) => (
            <li key={index}>
                <button
                className="w-full text-left px-4 py-2 text-xs sm:text-sm lg:text-base text-secondary-black hover:text-primary-white hover:bg-primary-sky-blue"
                onClick={() => {
                    item.onClick();
                    onClose();
                }}
                >
                {item.label}
                </button>
            </li>
            ))}
        </ul>
        </div>
    );
    };

    export default MoreOptionsMenu;
