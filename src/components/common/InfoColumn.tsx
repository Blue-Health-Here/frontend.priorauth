import React from "react";

interface InfoColumnProps {
  icon: React.ReactNode;
  label: string;
  data?: string | number;
  className?: string;
  isArchived?: boolean;
}

const InfoColumn: React.FC<InfoColumnProps> = ({ 
  icon, 
  label, 
  data, 
  className = "",
  isArchived = false 
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${isArchived ? "bg-[#F5F5F5]" : "bg-[#EBF1FF]"}`}>
        {icon}
      </div>
      <div className="flex-1">
        {label && <p className="text-xs text-muted-foreground text-secondary-black">{label}</p>}
        {data && <p className="text-sm font-semibold text-primary-black">{data}</p>}
      </div>
    </div>
  );
};

export default InfoColumn;