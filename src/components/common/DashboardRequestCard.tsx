import React, { useEffect, useRef, useState } from 'react';
import * as Chart from 'chart.js';

// Register Chart.js components
Chart.Chart.register(
    Chart.CategoryScale,
    Chart.LinearScale,
    Chart.BarController,
    Chart.BarElement,
    Chart.Title,
    Chart.Tooltip,
    Chart.Legend
);

const DashboardRequestCard: React.FC<any> = ({
    title,
    description = "Total no of requests on platform to avail services",
    value = "42K",
    data
}) => {
    const chartRef = useRef<any>(null);
    const chartInstance = useRef<any>(null);
    const [activePeriod, setActivePeriod] = useState<any>('Y');

    // Sample data for different periods
    const chartData: any = {
        Y: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                data: data?.yearly || [35, 42, 38, 45, 52, 48, 58, 62, 55, 68, 72, 65],
                backgroundColor: '#66D0FF',
                borderRadius: 2,
                borderSkipped: false,
                barPercentage: 0.75,
            }]
        },
        M: {
            labels: Array.from({ length: 30 }, (_, i) => i + 1),
            datasets: [{
                data: data?.monthly || [15, 22, 18, 28, 32, 25, 35, 42, 38, 45, 52, 48, 58, 62, 55, 68, 72, 65, 58, 62, 55, 48, 52, 58, 62, 55, 48, 42, 38, 45],
                backgroundColor: '#66D0FF',
                borderRadius: 2,
                borderSkipped: false,
            }]
        },
        W: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                data: data?.weekly || [65, 72, 58, 68, 45, 62, 75],
                backgroundColor: '#66D0FF',
                borderRadius: 5,
                borderSkipped: false,
                barPercentage: 0.5,
                categoryPercentage: 0.5
            }]
        }
    };

    const chartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 600, // Adjust for smoother/faster animation
            easing: 'easeInOutCubic', // Try 'easeOutBounce', 'easeInOutCubic' for different feels
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        scales: {
            x: {
                display: false,
                grid: { display: false },
                stacked: true,
                border: { display: false },
                offset: true,
            },
            y: {
                display: false,
                grid: { display: false },
                max: 100
            }
        },
        elements: {
            bar: {
                borderWidth: 0
            }
        }
    };
    

    const updateChart = (period: any) => {
        if (chartInstance.current && !chartInstance.current.destroyed) {
            try {
                chartInstance.current.data = chartData[period];
                chartInstance.current.update('active');
            } catch (error) {
                console.warn('Chart update failed, reinitializing:', error);
                initChart();
            }
        }
    };

    const initChart = () => {
        if (chartRef.current) {
            // Clean up existing chart
            if (chartInstance.current && !chartInstance.current.destroyed) {
                chartInstance.current.destroy();
            }
            chartInstance.current = null;

            // Create new chart
            chartInstance.current = new Chart.Chart(chartRef.current, {
                type: 'bar',
                data: chartData[activePeriod],
                options: chartOptions
            });
        }
    };

    const handlePeriodChange = (period: any) => {
        setActivePeriod(period);
        updateChart(period);
    };

    useEffect(() => {
        const initChartDelayed = () => {
            if (chartRef.current) {
                // Clean up existing chart instance
                if (chartInstance.current && !chartInstance.current.destroyed) {
                    chartInstance.current.destroy();
                    chartInstance.current = null;
                }

                // Get the canvas context and clear it
                const ctx = chartRef.current.getContext('2d');
                if (ctx) {
                    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

                    // Create new chart instance
                    chartInstance.current = new Chart.Chart(chartRef.current, {
                        type: 'bar',
                        data: chartData[activePeriod],
                        options: chartOptions
                    });
                }
            }
        };

        // Small delay to ensure DOM is ready
        const timeoutId = setTimeout(initChartDelayed, 0);

        // Cleanup function
        return () => {
            clearTimeout(timeoutId);
            if (chartInstance.current && !chartInstance.current.destroyed) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);

    return (
        <div className="rounded-2xl p-4 theme-shadow bg-white transition-colors min-h-[120px] w-full flex flex-col justify-between gap-2 request-graph">
            <div className="flex items-start flex-wrap gap-3 justify-between">
                <div className="font-secondary">
                    <h3 className="text-sm md:text-base font-semibold text-primary-black">
                        {title}
                    </h3>
                    <p className="text-xs mt-1 text-tertiary-black">
                        {description}
                    </p>
                </div>
                <div className="flex space-x-1 text-xs border border-quaternary-navy-blue rounded-lg p-0.5">
                    {['Y', 'M', 'W'].map((period) => (
                        <button
                            key={period}
                            type='button'
                            onClick={() => handlePeriodChange(period)}
                            className={`px-2 py-1 cursor-pointer rounded-md transition-colors ${activePeriod === period
                                ? 'bg-quaternary-navy-blue text-primary-navy-blue'
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between gap-4">
                <div className="text-xl md:text-5xl font-semibold text-primary-black">
                    {value}
                </div>
                <div className="flex-1">
                    <div className="h-24">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardRequestCard;