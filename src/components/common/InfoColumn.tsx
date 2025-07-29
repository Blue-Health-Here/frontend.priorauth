import { useTheme } from "@/hooks/useTheme";
import React from "react";

interface InfoColumnProps {
  icon?: React.ReactNode;
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
  const { isDark } = useTheme();
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {icon && <div className={`w-6 h-6 rounded-md flex items-center justify-center ${isDark ? "bg-navy-dark-blue-600 text-white-800" : isArchived ? "bg-input-disabled-bg" : "bg-icon-group-bg text-icon-group-icon"}`}>
        {icon}
      </div>}
      <div className="flex-1">
        {label && <p className="text-xs text-muted-foreground text-secondary-black">{label}</p>}
        {data && <p className="text-sm font-semibold text-primary-black">{data}</p>}
      </div>
    </div>
  );
};

export default InfoColumn;