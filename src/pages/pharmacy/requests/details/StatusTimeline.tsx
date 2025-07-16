import { FiFileText } from "react-icons/fi";
import ThemeButton from "@/components/common/ThemeButton";
import React, { useEffect, useState } from "react";
import { formatDateTime, getStatusClass } from "@/utils/helper";

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
          date: formatDateTime(currentStatus.date),
          isActive: true,
          note: "", // optionally add current note
          statusClass: getStatusClass(currentStatus.name), // highlight for active
        },
        ...(previousStatuses.length > 0 ? previousStatuses.map((status: any) => ({
          title: status.name,
          date: formatDateTime(status.date),
          isActive: false,
          note: "", // optionally populate if API supports notes
          statusClass: getStatusClass(status.name), // style for past
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
                className={`relative flex items-center gap-4 ${item.isActive
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
                      className={`px-4 py-1 rounded-full line-clamp-1 text-xs sm:text-sm lg:text-base font-medium ${item.statusClass}`}
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

export default StatusTimeline;