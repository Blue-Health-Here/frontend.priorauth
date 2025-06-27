import React from "react";

const CardHeader: React.FC<any> = ({ title }) => {
    return (
        <div className="bg-quaternary-navy-blue px-3 py-2">
            <h3 className="text-sm sm:text-md font-semibold text-gray-800">{title}</h3>
        </div>
    )
};

export default CardHeader;