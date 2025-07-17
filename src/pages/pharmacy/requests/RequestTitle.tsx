import { formatUsernameToPrescriber } from "@/utils/helper";
import React from "react";
import { useNavigate } from "react-router-dom";

const RequestTitle: React.FC<any> = ({ isAdmin, prescriber }) => {
    const navigate = useNavigate();
    return (
        <h2 className="text-lg font-bold text-gray-800 inline-flex gap-2 items-center">
            {prescriber && <img onClick={() => navigate(isAdmin ? "/admin/prescribers" : "/pharmacy/prescribers")} src='/header-left-logo-arrow.svg'
                alt='header left logo arrow' className={`w-8 h-8 bg-gray-100 p-2 rounded-lg cursor-pointer`} />}
            <span>{prescriber ? formatUsernameToPrescriber(prescriber) : "Your Requests"}</span>
        </h2>
    )
};

export default RequestTitle;