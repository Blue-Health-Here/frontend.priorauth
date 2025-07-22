import React from 'react';
import { FiX } from 'react-icons/fi';

// Generic Side Drawer Component
const SideDrawer: React.FC<any> = ({
    isOpen,
    onClose,
    children,
    title,
    width = 'w-96',
    position = 'right',
    showOverlay = true,
    closeOnOverlayClick = true,
    className = '',
    isClose = false
}) => {
    const positionClasses: any = {
        right: `right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`,
        left: `left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`,
    };

    return (
        <>
            {isOpen && (
                <div className='fixed inset-0 z-100 flex items-center justify-center bg-opacity-50 backdrop-blur-sm transition-opacity duration-300'>
                    {/* Overlay */}
                    {showOverlay && isOpen && (
                        <div
                            className="absolute inset-0 bottom-0 top-0 bg-black opacity-40 backdrop-blur-sm z-10"
                            onClick={closeOnOverlayClick ? onClose : undefined}
                        />
                    )}

                    {/* Drawer */}
                    <div className={`
                        fixed top-0 ${positionClasses[position]} h-full ${width} 
                        bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
                        ${className}
                    `}>
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-light-stroke">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={onClose}
                                    className="p-1 transition-colors"
                                >
                                    <img alt="header left logo arrow" 
                                        className="w-8 h-8 bg-gray-100 p-2 rounded-lg cursor-pointer rotate-180" 
                                        src="/header-left-logo-arrow.svg" />
                                </button>
                                {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
                            </div>
                            {isClose && <button
                                onClick={onClose}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <FiX className="h-5 w-5 text-gray-600" />
                            </button>}
                        </div>

                        {/* Content */}
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default SideDrawer;
