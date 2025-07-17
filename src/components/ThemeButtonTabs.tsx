import React from "react";

interface ThemeButtonTabsProps {
    activeTab: string;
    data: any[];
    setActiveTab: (item: any) => void;
    className?: string;
};

const ThemeButtonTabs: React.FC<ThemeButtonTabsProps> = ({ data, activeTab, setActiveTab, className }) => {
    return (
        <div className={`flex gap-1 text-xs border border-quaternary-navy-blue rounded-xl p-1 h-full ${className}`}>
            {data.map((item) => (
                <button
                    key={item}
                    type='button'
                    onClick={() => setActiveTab(item)}
                    className={`px-3 py-2 cursor-pointer rounded-lg flex-1 font-medium transition-colors ${activeTab === item
                        ? 'bg-quaternary-navy-blue text-primary-navy-blue'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    {item}
                </button>
            ))}
        </div>
    )
};

export default ThemeButtonTabs;






