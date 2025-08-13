import React from "react";

const CardHeader: React.FC<any> = ({ title, className }) => {
    return (
        <div className={`bg-body-stroke px-4 py-3 ${className}`}>
            <h3 className="text-sm sm:text-md font-semibold text-primary-black">{title}</h3>
        </div>
    )
};

export default CardHeader;