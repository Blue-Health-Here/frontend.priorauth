import React from "react";

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 overflow-auto">
      {/* Overlay Shadow */}
      <div className="absolute inset-0 bottom-0 top-0 bg-black opacity-40 backdrop-blur-sm z-10" />
      <div className="relative flex flex-col bg-white z-20 rounded-lg shadow-xl border border-gray-300 transform transition-all duration-300 scale-95 opacity-0 animate-fadeIn">
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
