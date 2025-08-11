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
    ChartData,
    ChartOptions,
} from "chart.js";
import { generateDatasetForCaseAnalysis } from "@/utils/helper";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CaseAnalysisCard = () => {
    const [range, setRange] = useState("Y");
    const [screenSize, setScreenSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setScreenSize('mobile');
            } else if (width >= 640 && width < 1024) {
                setScreenSize('tablet');
            } else {
                setScreenSize('desktop');
            }
        };

        // Theme detection
        const checkTheme = () => {
            setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        };

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        handleResize();
        checkTheme();
        window.addEventListener('resize', handleResize);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const datasetsByRange: any = {
        W: generateDatasetForCaseAnalysis(3, 12),
        M: generateDatasetForCaseAnalysis(3, 12),
        Y: generateDatasetForCaseAnalysis(3, 12),
    };

    const [approved, denied, planExclusion] = datasetsByRange[range];

    const data: ChartData<"bar"> = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Denial",
                backgroundColor: theme === 'dark' ? '#D30000' : '#FF4040',
                data: denied,
                barThickness: screenSize === 'mobile' ? 12 : screenSize === 'tablet' ? 30 : 90,
                categoryPercentage: screenSize === 'mobile' ? 0.6 : screenSize === 'tablet' ? 0.8 : 1,
                barPercentage: screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.85 : 0.9,
            },
            {
                label: "Plan Exclusion",
                backgroundColor: theme === 'dark' ? '#CE7500' : '#F9A538',
                data: planExclusion,
                barThickness: screenSize === 'mobile' ? 12 : screenSize === 'tablet' ? 30 : 90,
                categoryPercentage: screenSize === 'mobile' ? 0.6 : screenSize === 'tablet' ? 0.8 : 1,
                barPercentage: screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.85 : 0.9,
            },
            {
                label: "Approval",
                backgroundColor: theme === 'dark' ? '#1FC001' : '#5CE543',
                data: approved,
                barThickness: screenSize === 'mobile' ? 12 : screenSize === 'tablet' ? 30 : 90,
                categoryPercentage: screenSize === 'mobile' ? 0.6 : screenSize === 'tablet' ? 0.8 : 1,
                barPercentage: screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.85 : 0.9,
                borderRadius: { topLeft: 10, topRight: 10 },
            },
        ],
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : undefined,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#666',
                    font: {
                        size: screenSize === 'mobile' ? 10 : screenSize === 'tablet' ? 11 : 12,
                    },
                    autoSkip: false,
                    maxRotation: screenSize === 'mobile' ? 45 : 0,
                    minRotation: screenSize === 'mobile' ? 45 : 0,
                },
            },
            y: {
                stacked: true,
                grid: {
                    display: true,
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : undefined,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#666',
                    font: {
                        size: screenSize === 'mobile' ? 10 : 12,
                    },
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : undefined,
                    boxWidth: 12,
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'rect',
                    font: {
                        size: screenSize === 'mobile' ? 10 : 12,
                    },
                    generateLabels: (chart: ChartJS) => {
                        const original = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
                        return original.reverse();
                    }
                }
            },
            tooltip: {
                backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
                titleColor: theme === 'dark' ? '#FFFFFF' : '#333333',
                bodyColor: theme === 'dark' ? '#FFFFFF' : '#333333',
                borderColor: theme === 'dark' ? '#475569' : '#E2E8F0',
            }
        },
        layout: {
            padding: {
                left: screenSize === 'mobile' ? 10 : 0,
                right: screenSize === 'mobile' ? 10 : 0,
            }
        }
    };

    return (
        <div className="bg-primary-white dark:bg-dark-800 rounded-2xl p-4 theme-shadow w-full border"
            style={{ 
                borderColor: 'var(--border-color)'
            }}
        >
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold dark:text-gray-200">Case Analysis</h2>
                <div className="flex space-x-2 text-xs border border-quaternary-navy-blue dark:border-gray-600 rounded-lg p-0.5">
                    {["W", "M", "Y"].map((period) => (
                        <button
                            key={period}
                            type='button'
                            onClick={() => setRange(period)}
                            className={`px-3 py-2 cursor-pointer rounded-md transition-colors ${range === period
                                    ? 'bg-[var(--active-background-color)]'
                                    : 'text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>
            <div className={`h-[${screenSize === 'mobile' ? '320px' : screenSize === 'tablet' ? '380px' : '400px'}] w-full`}>
                <Bar data={data} options={options} className="w-full max-h-[400px]" />
            </div>
        </div>
    );
};

export default CaseAnalysisCard;