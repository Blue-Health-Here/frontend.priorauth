import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
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
    isClose = false,
    arrowClass = 'rotate-180', handleOpenReqDetails
}) => {
    const positionClasses: any = {
        right: `right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`,
        left: `left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`,
    };

    // Responsive width - full width on mobile, specified width on desktop
    const responsiveWidth = `w-full md:${width}`;

    useLockBodyScroll(isOpen);

    return (
        <>
            {isOpen && (
                <div className='fixed inset-0 z-100 flex items-center justify-center bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 m-0'>
                    {/* Overlay */}
                    {showOverlay && isOpen && (
                        <div
                            className="absolute inset-0 bottom-0 top-0 bg-black opacity-40 backdrop-blur-sm z-10"
                            onClick={closeOnOverlayClick ? onClose : undefined}
                        />
                    )}

                    {/* Drawer */}
                    <div className={`
                        fixed top-0 ${positionClasses[position]} h-full ${responsiveWidth} 
                        bg-primary-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
                        ${className}
                    `}>
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-light-stroke w-full">
                            <div className="inline-flex gap-2 items-center w-full">
                                <button
                                    onClick={onClose}
                                    className="p-1 transition-colors"
                                >
                                    <img alt="header left logo arrow" 
                                        className={`w-8 h-8 bg-gray-100 p-2 rounded-lg cursor-pointer ${arrowClass}`} 
                                        src="/header-left-logo-arrow.svg" />
                                </button>
                                {title && <h2 className="md:text-lg font-semibold text-primary-black">{title}</h2>}
                            </div>
                            {isClose && <button
                                onClick={onClose}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <FiX className="h-5 w-5 text-gray-600" />
                            </button>}
                            {handleOpenReqDetails && (
                                <button
                                    onClick={handleOpenReqDetails}
                                    className="p-1 transition-colors hidden md:block"
                                >
                                    <img src='/next-arrow-up.svg' alt="next arrow up" 
                                        className="w-8 h-8 bg-gray-100 p-2.5 rounded-lg cursor-pointer" />
                                </button>
                            )}
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