import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { timeRanges } from "@/utils/constants";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MedicationWiseChart = () => {
    const [range, setRange] = useState("Today");

    const datasetsByRange: any = {
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

    const data = {
        labels: [
            "SLYND 4 MG O...",
            "ZEPBOUND 2.5...",
            "VOQUEZNA 2...",
            "SLYND 4MG TA...",
            "NURTEC ODT 7...",
            "XIFAXAN 550M...",
        ],
        datasets: [
            {
                label: "Requests",
                backgroundColor: "#007AFF",
                data: requests,
                borderRadius: { topLeft: 8, topRight: 8 }, // Add top radius
            },
            {
                label: "Approved",
                backgroundColor: "#5CE543",
                data: approved,
                borderRadius: { topLeft: 8, topRight: 8 }, // Add top radius
            },
        ],
    };

  const options: any = {
    responsive: true,
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
                callback: function(this: any, value: string | number, index: number) {
                    // Get the full label text
                    const label = typeof value === 'number' 
                        ? this.chart.data.labels?.[index] || ''
                        : value;
                    
                    // Truncate long labels and add ellipsis
                    return label.length > 10 ? `${label.substring(0, 10)}...` : label;
                }
            },
            barThickness: 30,
            categoryPercentage: 0.8,
            barPercentage: 0.9,
        },
        y: {
            grid: {
                display: true,
                drawTicks: false,
            },
            border: {
                display: false,
            },
            ticks: {
                stepSize: 500,
                callback: function(value: string | number) {
                    return Number(value).toString();
                },
                padding: 10,
            },
            beginAtZero: true,
        },
    },
    plugins: {
        legend: { 
            position: 'top',
            align: 'start',
            labels: {
                boxWidth: 12,
                padding: 10,
                usePointStyle: true,
                pointStyle: 'rect',
            }
        },
        title: { display: false },
        tooltip: {
            callbacks: {
                label: function(context: any) {
                    return `${context.dataset.label}: ${context.parsed.y}`;
                }
            }
        }
    },
};
    return (
        <div className="bg-white rounded-2xl p-4 theme-shadow w-full">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Medication wise Analysis</h2>
                <div className="flex space-x-2 text-xs border border-quaternary-navy-blue rounded-lg p-0.5">
                    {timeRanges.map((period) => (
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
            <Bar data={data} options={options} />
        </div>
    );
};

export default MedicationWiseChart;