import React, { useEffect, useRef, useState } from 'react';
import * as Chart from 'chart.js';

// Register Chart.js components
Chart.Chart.register(
    Chart.ArcElement,
    Chart.DoughnutController,
    Chart.Tooltip,
    Chart.Legend
);

const GlobalStatsCard: React.FC<any> = ({
    title = "Global Stats",
    description = "Total no. of Sessions/sessions Doctors need to attend",
    data
}) => {
    const chartRef = useRef<any>(null);
    const chartInstance = useRef<any>(null);
    const [activePeriod, setActivePeriod] = useState<any>('Y');

    const statsData: any = {
        Y: {
            totalRequests: data?.yearly?.total || 19200, 
            stats: data?.yearly?.stats || [
                { label: 'Approval', value: 56, color: '#19AD4B' },
                { label: 'Denial', value: 18, color: '#FF2E37' },
                { label: 'Pending', value: 26, color: '#1594CC' }
            ]
        },
        M: {
            totalRequests: data?.monthly?.total || 15800,
            stats: data?.monthly?.stats || [
                { label: 'Approval', value: 62, color: '#19AD4B' },
                { label: 'Denial', value: 15, color: '#FF2E37' },
                { label: 'Pending', value: 23, color: '#1594CC' }
            ]
        },
        W: {
            totalRequests: data?.weekly?.total || 3200,
            stats: data?.weekly?.stats || [
                { label: 'Approval', value: 48, color: '#19AD4B' },
                { label: 'Denial', value: 22, color: '#FF2E37' },
                { label: 'Pending', value: 30, color: '#1594CC' }
            ]
        }
    };

    const createChartData = (period: any) => {
        const currentData = statsData[period];
        return {
            datasets: [{
                data: currentData.stats.map((stat: any) => stat.value),
                backgroundColor: currentData.stats.map((stat: any) => stat.color),
                borderWidth: 4,
                borderColor: '#ffffff',
                cutout: '35%',
                spacing: 2
            }]
        };
    };

    const chartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    };

    const updateChart = (period: any) => {
        if (chartInstance.current && !chartInstance.current.destroyed) {
            try {
                chartInstance.current.data = createChartData(period);
                chartInstance.current.update('none');
            } catch (error) {
                console.warn('Chart update failed, reinitializing:', error);
                initChart();
            }
        }
    };

    const initChart = () => {
        if (chartRef.current) {
            if (chartInstance.current && !chartInstance.current.destroyed) {
                chartInstance.current.destroy();
            }
            chartInstance.current = null;

            chartInstance.current = new Chart.Chart(chartRef.current, {
                type: 'doughnut',
                data: createChartData(activePeriod),
                options: chartOptions
            });
        }
    };

    const handlePeriodChange = (period: any) => {
        setActivePeriod(period);
        updateChart(period);
    };

    useEffect(() => {
        const initChart = () => {
            if (chartRef.current) {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                    chartInstance.current = null;
                }

                const ctx = chartRef.current.getContext('2d');
                if (ctx) {
                    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

                    chartInstance.current = new Chart.Chart(chartRef.current, {
                        type: 'doughnut',
                        data: createChartData(activePeriod),
                        options: chartOptions
                    });
                }
            }
        };

        const timeoutId = setTimeout(initChart, 0);

        return () => {
            clearTimeout(timeoutId);
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, []);

    const currentData = statsData[activePeriod];

    return (
        <div className="rounded-2xl p-5 theme-shadow bg-primary-white transition-colors min-h-full w-full flex flex-col justify-between border"
        style={{ 
      borderColor: 'var(--border-color)'
    }}
        >
            {/* Header with reduced bottom margin */}
            <div className="flex items-start flex-wrap justify-between mb-2"> {/* Changed mb-1 to mb-2 */}
                <div>
                    <h3 className="text-lg font-semibold text-primary-black">{title}</h3> {/* Removed mb-1 */}
                    <p className="text-sm text-tertiary-black mt-1">{description}</p> {/* Added mt-1 */}
                </div>
                <div className="flex space-x-2 text-xs border rounded-lg p-0.5"
                style={{ 
      borderColor: 'var(--border-color)'
    }}
                >
                    {['Y', 'M', 'W'].map((period) => (
                        <button
                            key={period}
                            type='button'
                            onClick={() => handlePeriodChange(period)}
                            className={`px-3 py-2 cursor-pointer rounded-md transition-colors ${activePeriod === period
                                ? 'bg-[var(--active-background-color)] '
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart and Stats with tighter spacing */}
            <div className="flex items-center flex-wrap justify-between mt-10 px-4"> {/* Added mt-2 instead of gap */}
                {/* Doughnut Chart - unchanged size */}
                <div className="relative">
                    <div className="w-48 h-48">
                        <canvas ref={chartRef}></canvas>
                    </div>
                    {/* Percentage labels on chart */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            {currentData.stats.map((stat: any, index: number) => {
                                const previousTotal = currentData.stats.slice(0, index).reduce((sum: any, s: any) => sum + s.value, 0);
                                const segmentMiddle = previousTotal + (stat.value / 2);
                                const angleInDegrees = (segmentMiddle * 360) / 100;
                                const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
                                const radius = 70;
                                const x = Math.cos(angleInRadians) * radius;
                                const y = Math.sin(angleInRadians) * radius;
                                
                                return (
                                    <div key={stat.label} className="absolute text-white text-xs font-bold drop-shadow-sm"
                                        style={{ left: '50%', top: '50%', transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)` }}>
                                        {stat.value}%
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Stats Legend - unchanged */}
                <div className="flex-1 md:ml-20">
                    <div className="mb-4">
                        <h4 className="text-sm md:text-base font-medium text-quaternary-white mb-1">Total Requests</h4>
                        <div className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900">
                            {currentData.totalRequests.toLocaleString()}
                        </div>
                    </div>

                    <div className="space-y-3">
                        {currentData.stats.map((stat: any) => (
                            <div key={stat.label} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div
                                        className="w-2.5 h-2.5 mr-3"
                                        style={{ backgroundColor: stat.color,borderRadius: '2px'  }}
                                    ></div>
                                    <span className="text-sm font-medium text-primary-black">{stat.label}</span>
                                </div>
                                <span className="text-sm font-medium text-primary-black">{stat.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalStatsCard;