import React, { useEffect, useRef, useState } from 'react';
import * as Chart from 'chart.js';

// Register Chart.js components
Chart.Chart.register(
  Chart.ArcElement,
  Chart.DoughnutController,
  Chart.Tooltip,
  Chart.Legend
);

interface GlobalStatsCardProps {
  title?: string;
  description?: string;
  data: {
    yearly: {
      total: number;
      stats: {
        label: string;
        value: number;
        color: string;
      }[];
    };
    monthly: {
      total: number;
      stats: {
        label: string;
        value: number;
        color: string;
      }[];
    };
    weekly: {
      total: number;
      stats: {
        label: string;
        value: number;
        color: string;
      }[];
    };
  };
}

const GlobalStatsCard: React.FC<GlobalStatsCardProps> = ({ title, description, data }) => {
  const chartRef = useRef<any>(null);
  const chartInstance = useRef<any>(null);
  const [activePeriod, setActivePeriod] = useState<'Y' | 'M' | 'W'>('Y');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    checkDarkMode();
    return () => observer.disconnect();
  }, []);

  const getStatsData = (period: 'Y' | 'M' | 'W') => {
    const source = period === 'Y' ? data.yearly 
                : period === 'M' ? data.monthly 
                : data.weekly;
    
    return {
      total: source.total,
      stats: source.stats.map(stat => ({
        ...stat,
        color: isDarkMode 
          ? stat.label === 'Approval' ? '#1FC001'
          : stat.label === 'Denial' ? '#D30000'
          : '#0160C8'
          : stat.color
      }))
    };
  };

  const currentData = getStatsData(activePeriod);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart.Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: currentData.stats.map(s => s.value),
          backgroundColor: currentData.stats.map(s => s.color),
          borderWidth: isDarkMode ? 0 : 4,
          borderColor: isDarkMode ? 'transparent' : '#ffffff',
          spacing: 2
        }]
      },
      options: {
        cutout: '35%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [activePeriod, isDarkMode]);

  return (
    <div className="rounded-2xl p-5 theme-shadow bg-primary-white dark:bg-dark-800 transition-colors min-h-full w-full flex flex-col justify-between border"
         style={{ borderColor: 'var(--border-color)' }}>
      {/* Header */}
      <div className="flex items-start flex-wrap justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-primary-black dark:text-white">{title || 'Global Stats'}</h3>
          <p className="text-sm text-tertiary-black dark:text-gray-300 mt-1">
            {description || 'Total no. of Sessions/sessions Doctors need to attend'}
          </p>
        </div>
        <div className="flex space-x-2 text-xs border rounded-lg p-0.5"
             style={{ borderColor: 'var(--border-color)' }}>
          {['Y', 'M', 'W'].map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period as 'Y' | 'M' | 'W')}
              className={`px-3 py-2 cursor-pointer rounded-md transition-colors ${activePeriod === period
                ? 'bg-[var(--active-background-color)] dark:text-white'
                : 'text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-center flex-wrap justify-between mt-10 px-4">
        <div className="relative">
          <div className="w-48 h-48">
            <canvas ref={chartRef}></canvas>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {currentData.stats.map((stat, index) => {
              const previousTotal = currentData.stats.slice(0, index).reduce((sum, s) => sum + s.value, 0);
              const segmentMiddle = previousTotal + (stat.value / 2);
              const angleInDegrees = (segmentMiddle * 360) / 100;
              const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
              const radius = 70;
              const x = Math.cos(angleInRadians) * radius;
              const y = Math.sin(angleInRadians) * radius;
              
              return (
                <div key={stat.label} className="absolute text-white text-xs font-bold drop-shadow-sm"
                  style={{ 
                    left: '50%', 
                    top: '50%', 
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` 
                  }}>
                  {stat.value}%
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 md:ml-20">
          <div className="mb-4">
            <h4 className="text-sm md:text-base font-medium text-quaternary-white dark:text-gray-300 mb-1">Total Requests</h4>
            <div className="totalrequests text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              {currentData.total.toLocaleString()}
            </div>
          </div>

          <div className="space-y-3">
            {currentData.stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 mr-3" 
                       style={{ backgroundColor: stat.color, borderRadius: '2px' }} />
                  <span className="text-sm font-medium text-primary-black dark:text-white">
                    {stat.label}
                  </span>
                </div>
                <span className="text-sm font-medium text-primary-black dark:text-white">
                  {stat.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalStatsCard;