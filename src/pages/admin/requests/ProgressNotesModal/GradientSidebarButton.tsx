// components/GradientSidebarButton.tsx
import React from "react";

const GradientSidebarButton: React.FC = () => {
    return (
        <button type="button" className="relative cursor-pointer rounded-lg p-[1px] bg-gradient-to-r from-[#F8A8AA] via-[#FFA5E0] via-[#FFDFD7] via-[#FFB126] to-[#FF512B]">
            <div className="bg-white rounded-lg p-4 py-3">
                <div className="flex items-center justify-center gap-2">
                    <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#F66568] to-[#A16CF9]">
                        Start AI Analysis
                    </p>
                </div>
            </div>
        </button>
    );
};

export default GradientSidebarButton;
