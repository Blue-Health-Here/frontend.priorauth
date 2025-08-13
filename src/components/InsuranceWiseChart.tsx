import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useState, useEffect } from "react";
import { timeRanges } from "@/utils/constants";
import { useTheme } from "@/hooks/useTheme";
import ThemeButtonTabs from "./ThemeButtonTabs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TimeRange = "Today" | "W" | "M" | "Y";

const InsuranceWiseChart = () => {
  const [range, setRange] = useState<TimeRange>("Today");
  const [isMobile, setIsMobile] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const datasetsByRange: Record<TimeRange, number[][]> = {
    Today: [
      [1800, 1902, 1600, 1710, 1750, 1778, 1430, 1967, 1559, 2305, 856, 2245],
      [300, 400, 250, 320, 300, 420, 200, 330, 210, 280, 120, 180],
    ],
    W: [
      [1500, 1600, 1300, 1400, 1450, 1500, 1200, 1600, 1250, 1900, 700, 2000],
      [250, 300, 200, 280, 250, 300, 180, 280, 190, 250, 100, 150],
    ],
    M: [
      [8000, 8200, 7500, 7700, 7900, 8000, 6800, 8500, 7200, 9000, 3400, 8800],
      [1000, 1200, 800, 950, 1100, 1250, 750, 1000, 900, 1100, 400, 950],
    ],
    Y: [
      [
        95000, 98000, 91000, 93000, 94000, 96000, 87000, 100000, 89000, 105000,
        41000, 102000,
      ],
      [
        11000, 12000, 10000, 11500, 10800, 13000, 9000, 11000, 10000, 12000,
        5000, 11000,
      ],
    ],
  };

  const [approved, denied] = datasetsByRange[range];

  const labels = [
    "Golden State Health Plan",
    "CareSource Insurance",
    "Pacific Blue Cross",
    "Northstar Health",
    "Sunrise Health Insurance",
    "Aspire Health Network",
    "Evergreen Health Plan",
    "Summit Health Insurance",
    "Celtic Insurance Group",
    "Sunrise Health Insurance",
    "Bright Path Health",
    "Aspire Health Network",
  ].map((label) =>
    isMobile
      ? label.length > 12
        ? `${label.substring(0, 10)}...`
        : label
      : label
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Approval",
        backgroundColor: isDark === 'dark' ? '#1FC001' : '#5CE543',
        data: approved,
        borderRadius: 10,
      },
      {
        label: "Denial",
        backgroundColor: isDark === 'dark' ? '#D30000' : '#FF7E7E',
        data: denied,
        borderRadius: 10,
      },
    ],
  };

  // Common options
  const baseOptions: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { 
        position: "top",
        labels: {
          color: isDark === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#666666',
          font: {
            size: isMobile ? 9 : undefined,
          },
          boxWidth: 8,
          padding: 10,
        }
      },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { 
          display: true,
          color: isDark === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        border: { display: false },
        ticks: {
          color: isDark === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#666666',
          font: {
            size: isMobile ? 9 : undefined,
          }
        },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: isDark === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#666666',
          font: {
            size: isMobile ? 9 : undefined,
          }
        },
      },
    },
  };

  // Mobile-specific adjustments
  const mobileOptions: ChartOptions<"bar"> = {
    ...baseOptions,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 20,
      },
    },
  };

  return (
    <div
      className="bg-primary-white dark:bg-dark-800 rounded-2xl p-4 theme-shadow w-full border border-quaternary-navy-blue"
    >
      <div
        className={`flex ${
          isMobile ? "flex-col gap-1" : "justify-between items-center"
        } mb-2`}
      >
        <h2 className={`${isMobile ? "text-sm" : "text-lg"} font-semibold dark:text-gray-200`}>
          Insurance Analysis
        </h2>
        <ThemeButtonTabs
          data={timeRanges}
          activeTab={range}
          setActiveTab={setRange}
          className="w-full border-quaternary-navy-blue-dark !flex-0"
        />
        {/* <div
          className={`flex ${
            isMobile ? "flex-wrap gap-1" : "space-x-2"
          } text-xs border rounded-lg p-0.5 border-quaternary-navy-blue`}
        >
          {(timeRanges as TimeRange[]).map((period) => (
            <button
              key={period}
              onClick={() => setRange(period)}
              style={{
                color: range === period ? '' : 'var(--period-selector-text)',
                backgroundColor:
                  range === period
                    ? 'var(--active-background-color)'
                    : 'transparent',
              }}
              className={`
                ${isMobile ? "px-2 py-1 text-[10px]" : "px-3 py-2"}
                rounded-md
                ${range !== period ? "hover:bg-gray-50 dark:hover:bg-dark-700" : ""}
                dark:text-gray-300
              `}
            >
              {period}
            </button>
          ))}
        </div> */}
      </div>
      <div className={isMobile ? "h-[300px] ml-4" : ""}>
        <Bar 
          data={data} 
          options={isMobile ? mobileOptions : baseOptions} 
        />
      </div>
    </div>
  );
};

export default InsuranceWiseChart;