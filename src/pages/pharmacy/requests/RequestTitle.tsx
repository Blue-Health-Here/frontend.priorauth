import { formatUsernameToPrescriber } from "@/utils/helper";
import React from "react";
import { useNavigate } from "react-router-dom";

interface RequestTitleProps {
  isAdmin: boolean;
  prescriber?: string | null;
}

const RequestTitle: React.FC<RequestTitleProps> = ({ isAdmin, prescriber }) => {
  const navigate = useNavigate();
  
  // Function to format the prescriber name with possessive form
  const formatPrescriberName = (name: string) => {
    // Handle names ending with 's' (e.g., "James" becomes "James'")
    if (name.endsWith('s')) {
      return `${formatUsernameToPrescriber(name)}' Request`;
    }
    return `${formatUsernameToPrescriber(name)}'s Request`;
  };
  
  return (
    <h2 className="text-lg font-bold text-gray-800 inline-flex gap-2 items-center">
      {prescriber && (
        <img 
          onClick={() => navigate(isAdmin ? "/admin/prescribers" : "/pharmacy/prescribers")} 
          src='/header-left-logo-arrow.svg'
          alt='header left logo arrow' 
          className={`w-8 h-8 bg-gray-100 p-2 rounded-lg cursor-pointer`} 
        />
      )}
      <span>
        {prescriber 
          ? formatPrescriberName(prescriber)
          : isAdmin ? "All Requests" : "Your Requests"}
      </span>
    </h2>
  );
};

export default RequestTitle;