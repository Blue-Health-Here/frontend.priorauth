// components/GradientSidebarButton.tsx
import React from "react";

const GradientSidebarButton: React.FC<any> = ({ analysisStarted, disabled, startAnalysis, redoAnalysis }) => {
    const renderBtnContent = () => {
        return !analysisStarted ? (
            <span>Start AI Analysis</span>
        ) : (
            <>
                <span>Redo Analysis</span>
                <span>
                    <img src="/Refresh.svg" alt="Refresh Icon" className="animate-spin" />
                </span>
            </>
        );
    };

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={!analysisStarted ? startAnalysis : redoAnalysis}
            className={`relative cursor-pointer sticky bottom-4 left-4 right-4 rounded-lg p-[1px]
                ${disabled
                    ? "bg-primary-white cursor-not-allowed"
                    : "bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B]"
                }`}
        >
            <div
                className={`rounded-lg p-4 py-3 w-full
                    ${disabled
                        ? "bg-white text-gray-400 border border-gray-300"
                        : "bg-white text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9]"
                    }`}
            >
                <div className="flex items-center justify-center gap-2">
                    <p className={`${analysisStarted ? "flex gap-2 items-center" : ""}`}>
                        {renderBtnContent()}
                    </p>
                </div>
            </div>
        </button>
    );
};

export default GradientSidebarButton;
