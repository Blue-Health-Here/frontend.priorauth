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

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
                backgroundColor: "#FF4040",
                data: denied,
                barThickness: screenSize === 'mobile' ? 12 : screenSize === 'tablet' ? 30 : 90,
                categoryPercentage: screenSize === 'mobile' ? 0.6 : screenSize === 'tablet' ? 0.8 : 1,
                barPercentage: screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.85 : 0.9,
            },
            {
                label: "Plan Exclusion",
                backgroundColor: "#F9A538",
                data: planExclusion,
                barThickness: screenSize === 'mobile' ? 12 : screenSize === 'tablet' ? 30 : 90,
                categoryPercentage: screenSize === 'mobile' ? 0.6 : screenSize === 'tablet' ? 0.8 : 1,
                barPercentage: screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.85 : 0.9,
            },
            {
                label: "Approval",
                backgroundColor: "#5CE543",
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
                },
                border: {
                    display: false,
                },
                ticks: {
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
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: "#666",
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
        },
        layout: {
            padding: {
                left: screenSize === 'mobile' ? 10 : 0,
                right: screenSize === 'mobile' ? 10 : 0,
            }
        }
    };

    return (
        <div className="bg-primary-white rounded-2xl p-4 theme-shadow w-full">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Case Analysis</h2>
                <div className="flex space-x-2 text-xs border border-quaternary-navy-blue rounded-lg p-0.5">
                    {["W", "M", "Y"].map((period) => (
                        <button
                            key={period}
                            type='button'
                            onClick={() => setRange(period)}
                            className={`px-3 py-2 cursor-pointer rounded-md transition-colors ${range === period
                                    ? 'bg-quaternary-navy-blue text-primary-navy-blue'
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
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