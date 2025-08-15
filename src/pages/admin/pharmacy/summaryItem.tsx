import { useTheme } from "@/hooks/useTheme";
import React from "react";

interface SummaryItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  status?: 'approved' | 'denied' | 'pending' | 'neutral';
}

const SummaryItem: React.FC<SummaryItemProps> = ({
  icon,
  label,
  value,
}) => {
  const { isDark } = useTheme();
  return (
    <div className="flex items-center gap-3 p-1.5 border border-quaternary-navy-blue rounded-lg">
      {icon && <div className={`w-7 h-7 rounded-md flex items-center justify-center ${isDark ? "bg-navy-dark-blue-600 text-white-800" : "bg-icon-group-bg text-icon-group-icon"}`}>
        {icon}
      </div>}
      <div className="flex-1 text-primary-black">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-base font-bold">{value}</div>
      </div>
    </div>
  );
};

export default SummaryItem;