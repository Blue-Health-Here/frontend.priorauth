import ThemeButton from "@/components/common/ThemeButton";
import { useTheme } from "@/hooks/useTheme";
import React from "react";

interface PrescriberViewOnlyLayoutProps {
    children?: React.ReactNode;
}

const PrescriberViewOnlyLayout: React.FC<PrescriberViewOnlyLayoutProps> = ({ children }) => {
    const { isDark, toggleTheme } = useTheme();
    return (
        <div className="min-h-screen bg-primary-white">
            <header className="p-4 bg-primary-white theme-shadow flex justify-between items-center">
                <h2 className="text-lg font-medium inline-flex gap-2 items-center">
                    Prescriber’s Request
                    <span className="text-white-600">[View Only]</span>
                </h2>
                <div className="inline-flex gap-2 h-10">
                    <ThemeButton variant="tertiary">Sign Up</ThemeButton>
                    <ThemeButton variant="primary">Log In</ThemeButton>
                    
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center cursor-pointer rounded-lg border border-light-stroke p-2 w-10 h-10"
                    >
                        {isDark ? (
                            <img src="/sun.svg" alt="sun icon" className="w-5 h-5" />
                        ) : (
                            <img src="/theme-button.svg" alt="moon icon" className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </header>
            <div className="p-4">
                {children}
            </div>
        </div>
    )
};

export default PrescriberViewOnlyLayout;