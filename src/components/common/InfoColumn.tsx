import React from "react";

interface InfoColumnProps {
    icon?: React.ReactNode
    label?: string
    data?: string
}

const InfoColumn: React.FC<InfoColumnProps> = ({ icon, label, data }) => {
    return (
        <div className="flex items-center gap-3">
            {icon && (
                <div
                    className="w-8 h-8 rounded-md flex items-center justify-center p-0.5"
                    style={{ backgroundColor: '#EBF1FF' }}
                >
                    {icon}
                </div>
            )}
            <div className="flex-1">
                {label && <p className="text-sm text-muted-foreground text-secondary-black">{label}</p>}
                <p className="text-md font-semibold text-primary-black">{data}</p>
            </div>
        </div>
    )
};

export default InfoColumn;