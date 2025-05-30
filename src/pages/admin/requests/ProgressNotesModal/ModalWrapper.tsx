import React from "react";

interface ModalWrapperProps {
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      {/* Overlay Shadow */}
      <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-sm z-10" />
      <div className="relative flex flex-col bg-white rounded-lg shadow-xl border border-gray-300 
        transform transition-all duration-300 scale-95 opacity-0 animate-fadeIn 
        w-full max-w-8xl h-[90vh] sm:mx-4 overflow-hidden z-50" style={{ maxHeight: "calc(100vh - 4rem)" }}>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
