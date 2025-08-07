import { useState } from "react";
import { formatNumberWithUnits } from "../../../utils/helper";

const PARequestsSection = () => {
  const [activePeriod, setActivePeriod] = useState<any>("Y");
  const handlePeriodChange = (period: any) => {
    setActivePeriod(period);
  };

  const paReqStats = [
    { color: "#5CE543", label: "Approved", value: 1200 },
    { color: "#F9A538", label: "Plan Exclusion", value: 2500 },
    { color: "#FF4040", label: "Denied", value: 3700 },
    { color: "#66D0FF", label: "Queued for Call", value: 3700 },
    { color: "#007AFF", label: "Awaiting Insurance", value: 1200 },
  ];

  return (
    <div
      className="p-4 rounded-2xl bg-primary-white theme-shadow flex flex-col gap-4 border"
      style={{
        borderColor: "var(--border-color)",
      }}
    >
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <h3 className="font-semibold text-base text-primary-black">
          PA Requests
        </h3>
        <div
          className="flex space-x-2 text-xs border rounded-lg p-0.5"
          style={{ borderColor: "var(--border-color)" }}
        >
          {["Today", "Y", "M", "W"].map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => handlePeriodChange(period)}
              className={`px-3 py-2 cursor-pointer rounded-md transition-colors ${
                activePeriod === period
                  ? "bg-[var(--active-background-color)] text:white "
                  : "text-gray-400  hover:text-gray-600 hover:bg-gray-50   "
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {paReqStats.map((item: any, index: number) => (
          <div
            key={index}
            className="rounded-2xl border p-4 pt-2 flex flex-col gap-5 flex-1 min-w-[150px] h-[120px] justify-center"
            style={{ borderColor: "var(--border-color)" }}
          >
            <p className="flex gap-2 items-center text-sm dark:text-white">
              <span
                className={`w-3 h-3 rounded-full`}
                style={{ background: item.color }}
              ></span>
              <span>{item.label}</span>
            </p>
            <h3 className="font-semibold text-4xl dark:text-white">
              {formatNumberWithUnits(item.value)}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PARequestsSection;
