import { useEffect, useRef } from "react";
import * as Chart from "chart.js";
import { useTheme } from "@/hooks/useTheme";

const WithCNOrWithoutCNCards = () => {
  const approvedChartRef = useRef<any>(null);
  const deniedChartRef = useRef<any>(null);
  const approvedChartInstance = useRef<any>(null);
  const deniedChartInstance = useRef<any>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    // Register Chart.js components
    Chart.Chart.register(
      Chart.ArcElement,
      Chart.Tooltip,
      Chart.Legend,
      Chart.DoughnutController
    );

    // Approved Cases Chart
    if (approvedChartRef.current) {
      const ctx = approvedChartRef.current.getContext("2d");

      if (approvedChartInstance.current) {
        approvedChartInstance.current.destroy();
      }

      approvedChartInstance.current = new Chart.Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [65, 35],
              backgroundColor: isDark === 'dark' ? ["#D30000", "#1FC001"] : ["#FF4040", "#5CE543"],
              borderWidth: 0,
              spacing: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        },
      });
    }

    // Denied Cases Chart
    if (deniedChartRef.current) {
      const ctx = deniedChartRef.current.getContext("2d");

      if (deniedChartInstance.current) {
        deniedChartInstance.current.destroy();
      }

      deniedChartInstance.current = new Chart.Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [62, 38],
              backgroundColor: isDark === 'dark' ? ["#1FC001", "#D30000"] : ["#5CE543", "#FF4040"],
              borderWidth: 0,
              spacing: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        },
      });
    }

    // Cleanup function
    return () => {
      if (approvedChartInstance.current) {
        approvedChartInstance.current.destroy();
      }
      if (deniedChartInstance.current) {
        deniedChartInstance.current.destroy();
      }
    };
  }, [isDark]);

  return (
    <div
      className="bg-primary-white dark:bg-dark-800 p-6 rounded-2xl theme-shadow w-full mx-auto border"
      style={{
        borderColor: "var(--border-color)",
      }}
    >
      <h2 className="with-cn-vs-without-cn text-xl font-semibold text-gray-800 dark:text-white mb-6">
        With CN vs Without CN
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* With CN Card */}
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-4">
            <canvas ref={approvedChartRef} className="w-full h-full"></canvas>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-white">65%</div>
              </div>
            </div>
          </div>

          <h3 className="with-cn-vs-without-cn text-lg font-medium text-gray-800 dark:text-white mb-3">With CN</h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 bg-green-500 dark:bg-[#1FC001] rounded-xs mr-2"></div>
                <span className="with-cn-vs-without-cn text-sm text-gray-600 dark:text-white">Approved</span>
              </div>
              <span className="with-cn-vs-without-cn text-sm font-medium text-gray-800 dark:text-white">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 bg-red-500 dark:bg-[#D30000] rounded-xs mr-2"></div>
                <span className="with-cn-vs-without-cn text-sm text-gray-600 dark:text-white">Denied</span>
              </div>
              <span className="with-cn-vs-without-cn text-sm font-medium text-gray-800 dark:text-white">65%</span>
            </div>
          </div>
        </div>

        {/* Without CN Card */}
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-4">
            <canvas ref={deniedChartRef} className="w-full h-full"></canvas>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-white">62%</div>
              </div>
            </div>
          </div>

          <h3 className="with-cn-vs-without-cn text-lg font-medium text-gray-800 dark:text-white mb-3">Without CN</h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 bg-green-500 dark:bg-[#1FC001] rounded-xs mr-2"></div>
                <span className="with-cn-vs-without-cn text-sm text-gray-600 dark:text-white">Approved</span>
              </div>
              <span className="with-cn-vs-without-cn text-sm font-medium text-gray-800 dark:text-white">38%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 bg-red-300 dark:bg-[#D30000] rounded-xs mr-2"></div>
                <span className="with-cn-vs-without-cn text-sm text-gray-600 dark:text-white">Denied</span>
              </div>
              <span className="with-cn-vs-without-cn text-sm font-medium text-gray-800 dark:text-white">62%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithCNOrWithoutCNCards;