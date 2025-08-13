import { useState, useEffect } from "react";
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
  ChartData,
} from "chart.js";
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

const MedicationWiseChart = () => {
  const [range, setRange] = useState("Today");
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

  const datasetsByRange: Record<string, [number[], number[]]> = {
    Today: [
      [1802, 1701, 1600, 1402, 1320, 910],
      [1390, 1010, 1520, 1086, 954, 812],
    ],
    W: [
      [1200, 1100, 1000, 900, 800, 700],
      [1000, 900, 950, 850, 750, 650],
    ],
    M: [
      [5000, 4700, 4500, 4200, 4100, 3900],
      [4500, 4400, 4300, 4100, 4000, 3800],
    ],
    Y: [
      [55000, 53000, 51000, 49000, 47000, 45000],
      [52000, 51000, 50000, 47000, 46000, 44000],
    ],
  };

  const [requests, approved] = datasetsByRange[range];

  const getThemeColor = () => isDark === 'dark' ? '#0160c8' : '#007AFF';
  const getApprovedColor = () => isDark === 'dark' ? '#1FC001' : '#5CE543';

  const labels = [
    "SLYND 4 MG O...",
    "ZEPBOUND 2.5...",
    "VOQUEZNA 2...",
    "SLYND 4MG TA...",
    "NURTEC ODT 7...",
    "XIFAXAN 550M...",
  ];

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Requests",
        backgroundColor: getThemeColor(),
        borderColor: getThemeColor(),
        borderWidth: 0,
        hoverBackgroundColor: getThemeColor(),
        data: requests,
        borderRadius: 8,
      },
      {
        label: "Approved",
        backgroundColor: getApprovedColor(),
        borderColor: getApprovedColor(),
        borderWidth: 0,
        hoverBackgroundColor: getApprovedColor(),
        data: approved,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: true,
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          padding: 10,
          color: isDark === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#666666',
          font: {
            size: isMobile ? 10 : 12,
          },
          callback: function(_, index) {
            const label = this.getLabelForValue(index);
            return isMobile 
              ? (label.length > 4 ? `${label.substring(0, 4)}..` : label)
              : (label.length > 10 ? `${label.substring(0, 10)}...` : label);
          },
        },
      },
      y: {
        grid: {
          display: true,
          drawTicks: false,
          color: isDark === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        border: {
          display: false,
        },
        ticks: {
          stepSize: 500,
          color: isDark === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#666666',
          padding: 10,
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          boxWidth: 12,
          padding: 10,
          usePointStyle: true,
          pointStyle: "rect",
          color: isDark === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#666666',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
        },
        backgroundColor: isDark === 'dark' ? '#1E293B' : '#ffffff',
        titleColor: isDark === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#333333',
        bodyColor: isDark === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#333333',
        borderColor: isDark === 'dark' ? '#475569' : '#e2e8f0',
      },
    },
    datasets: {
      bar: {
        categoryPercentage: 0.8,
        barPercentage: 0.9,
      },
    },
  };

  return (
    <div className="bg-primary-white rounded-2xl p-4 theme-shadow w-full border border-quaternary-navy-blue">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Medication wise Analysis</h2>
        <ThemeButtonTabs
          data={timeRanges}
          activeTab={range}
          setActiveTab={setRange}
          className="w-full border-quaternary-navy-blue-dark !flex-0"
        />
        {/* <div className="flex space-x-2 text-xs border rounded-lg p-0.5 border-quaternary-navy-blue">
          {timeRanges.map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setRange(period)}
              className={`px-3 py-2 cursor-pointer rounded-md transition-colors ${
                range === period
                  ? 'bg-[var(--active-background-color)]'
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
            >
              {period}
            </button>
          ))}
        </div> */}
      </div>
      <div className="medication-chart w-full h-[calc(100%-50px)]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MedicationWiseChart;