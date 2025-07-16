import { FiFileText } from "react-icons/fi";
import ThemeButton from "@/components/common/ThemeButton";
import React, { useEffect, useState } from "react";

interface StatusTimelineProps {
  currentStatus: any;
  previousStatuses: any[];
  onCheckNotes?: () => void;
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ 
  currentStatus, 
  previousStatuses,
  onCheckNotes 
}) => {
  const [statusItems, setStatusItems] = useState<any>([]);

  useEffect(() => {
    if (currentStatus) {
      setStatusItems([
        {
          title: currentStatus.name,
          date: formatDate(currentStatus.date),
          isActive: true,
          note: "",
          statusClass: "bg-blue-100 text-blue-800",
        },
        ...(previousStatuses.length > 0 ? previousStatuses.map((status: any) => ({
          title: status.name,
          date: formatDate(status.date),
          isActive: false,
          note: "",
          statusClass: "bg-gray-100 text-gray-800",
        })) : [])
      ]);
    } else {
      setStatusItems([]);
    }
  }, [currentStatus, previousStatuses]);

  return (
    <div className="p-4 flex items-center justify-center flex-col gap-4">
      {statusItems.length > 0 ? (
        <>
          <div className="relative flex flex-col gap-4 w-full">
            <div className="absolute left-2.5 top-0 bottom-0 w-1.5 bg-gray-200"></div>
            {statusItems.map((item: any, index: any) => (
              <div
                key={index}
                className={`relative flex items-center gap-4 ${
                  item.isActive
                    ? "border border-dashed border-blue-navigation-link-button rounded-xl opacity-100" 
                    : "opacity-50"
                }`}
              >
                <div className="p-1 bg-white rounded-full inline-flex justify-center items-center ml-1">
                  <div className="relative z-10 w-2.5 h-2.5 rounded-full flex-shrink-0 p-1">
                    <div className="absolute inset-0 rounded-full bg-blue-500"></div>
                  </div>
                </div>

                <div className="p-2 w-full">
                  <div className="flex justify-between items-center gap-4 w-full">
                    <span
                      className={`px-4 py-1 rounded-full line-clamp-1 text-xs sm:text-sm lg:text-base font-normal ${item.statusClass}`}
                    >
                      {item.title}
                    </span>
                    {item.date && (
                      <span className="text-quaternary-white text-sm whitespace-nowrap">
                        {item.date}
                      </span>
                    )}
                  </div>

                  {item.note && (
                    <p className="text-tertiary-black text-md mt-2 italic">
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <ThemeButton
            variant="tertiary"
            className="border border-quaternary-navy-blue rounded-lg text-primary-navy-blue hover:bg-gray-50 transition-colors"
            onClick={onCheckNotes}
          >
            <span className="flex gap-2 items-center">
              Check Notes
              <FiFileText />
            </span>
          </ThemeButton>
        </>
      ) : (
        <p className="text-sm text-primary-black">Statuses Not Found.</p>
      )}
    </div>
  );
};

function formatDate(dateStr: any) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default StatusTimeline;