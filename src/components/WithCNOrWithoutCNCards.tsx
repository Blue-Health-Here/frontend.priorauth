import { useEffect, useRef } from "react";
import * as Chart from "chart.js";

const WithCNOrWithoutCNCards = () => {
  const approvedChartRef = useRef<any>(null);
  const deniedChartRef = useRef<any>(null);
  const approvedChartInstance = useRef<any>(null);
  const deniedChartInstance = useRef<any>(null);

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
              backgroundColor: ["#FF4040", "#5CE543"],
              borderWidth: 0,
              spacing: 4,
              // cutout: '60%'
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
              backgroundColor: ["#5CE543", "#FF4040"],
              borderWidth: 0,
              spacing: 4,
              // cutout: '60%'
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
  }, []);

  return (
    <div
      className="bg-primary-white p-6 rounded-2xl theme-shadow w-full mx-auto border"
      style={{
        borderColor: "var(--border-color)",
      }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        With CN vs Without CN
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Approved Cases Card */}
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-4">
            <canvas ref={approvedChartRef} className="w-full h-full"></canvas>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">80%</div>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-800 mb-3">With CN</h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-xs mr-2"></div>
                <span className="text-sm text-gray-600">Approved</span>
              </div>
              <span className="text-sm font-medium text-gray-800">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-xs mr-2"></div>
                <span className="text-sm text-gray-600">Denied</span>
              </div>
              <span className="text-sm font-medium text-gray-800">65%</span>
            </div>
          </div>
        </div>

        {/* Denied Cases Card */}
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-4">
            <canvas ref={deniedChartRef} className="w-full h-full"></canvas>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">62%</div>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-800 mb-3">Without CN</h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-xs mr-2"></div>
                <span className="text-sm text-gray-600">Approved</span>
              </div>
              <span className="text-sm font-medium text-gray-800">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 bg-red-300 rounded-xs mr-2"></div>
                <span className="text-sm text-gray-600">Denied</span>
              </div>
              <span className="text-sm font-medium text-gray-800">65%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithCNOrWithoutCNCards;
