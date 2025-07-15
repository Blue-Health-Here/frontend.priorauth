import React from "react";

const GradientSidebarButton: React.FC<any> = ({ analysisStarted, disabled, startAnalysis, redoAnalysis }) => {
    const renderBtnContent = () => {
        return !analysisStarted ? (
            <div className="flex items-center gap-3">
                <span className={disabled ? "text-[#A8A8A8]" : "bg-gradient-to-r from-[#F66568] to-[#A16CF9] bg-clip-text text-transparent"}>
                    Start AI Analysis
                </span>
                <img 
                    src={disabled ? "/Group (1).svg" : "/Group (2).svg"} 
                    alt="AI Icon" 
                    className="w-4.5 h-4.5" 
                />
            </div>
        ) : (
            <div className="flex items-center gap-3">
                <span className="bg-gradient-to-r from-[#F66568] to-[#A16CF9] bg-clip-text text-transparent">
                    Redo Analysis
                </span>
                <img src="/Refresh.svg" alt="Refresh Icon" className="animate-spin" />
            </div>
        );
    };

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={!analysisStarted ? startAnalysis : redoAnalysis}
            className={`relative sticky cursor-pointer bottom-4 left-4 right-4 rounded-lg p-[1px] ${
                disabled
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B]"
            }`}
        >
            <div
                className={`rounded-lg w-full flex items-center justify-center gap-2 p-4 py-3 ${
                    disabled
                        ? "bg-white text-gray-400"
                        : "bg-white text-sm font-medium"
                }`}
            >
                {renderBtnContent()}
            </div>
        </button>
    );
};

export default GradientSidebarButton;