import React from "react";

interface ThemeButtonTabsProps {
    activeTab: string;
    data: any[];
    setActiveTab: (item: any) => void;
    className?: string;
};

const ThemeButtonTabs: React.FC<ThemeButtonTabsProps> = ({ data, activeTab, setActiveTab, className }) => {
    return (
        <div className={`flex gap-1 text-xs border border-tabs-border rounded-xl p-1 h-full ${className}`}>
            {data.map((item) => (
                <button
                    key={item}
                    type='button'
                    onClick={() => setActiveTab(item)}
                    className={`px-3 py-2 cursor-pointer rounded-lg flex-1 font-medium transition-colors ${activeTab === item
                        ? 'bg-tabs-active-body text-tabs-text'
                        : 'text-gray-400 hover:text-tabs-text hover:bg-tabs-active-body'
                        }`}
                >
                    {item}
                </button>
            ))}
        </div>
    )
};

export default ThemeButtonTabs;






