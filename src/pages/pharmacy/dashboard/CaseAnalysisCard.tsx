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
    ChartData,
    ChartOptions,
} from "chart.js";
import { generateDatasetForCaseAnalysis } from "@/utils/helper";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CaseAnalysisCard = () => {
    const [range, setRange] = useState("Y");

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
                barThickness: 90,
                categoryPercentage: 1,
                barPercentage: 0.9,
            },
            {
                label: "Plan Exclusion",
                backgroundColor: "#F9A538",
                data: planExclusion,
                barThickness: 90,
                categoryPercentage: 1,
                barPercentage: 0.9,
            },
            {
                label: "Approval",
                backgroundColor: "#5CE543",
                data: approved,
                barThickness: 90,
                categoryPercentage: 1,
                barPercentage: 0.9,
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
                    display: false, // Ensure no border is shown
                },
                offset: true,
            },
            y: {
                stacked: true,
                grid: {
                    display: true,
                },
                border: {
                    display: false, // Ensure no border is shown
                },
                ticks: {
                    color: "#666", // Optional: customize tick color
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
                    generateLabels: (chart: ChartJS) => {
                        const original = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
                        return original.reverse();
                    }
                }
            },
        },
        layout: {
            padding: 0
        }
    };

    return (
        <div className="bg-white rounded-2xl p-4 theme-shadow w-full">
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
            <div className="h-[400px] w-full">
                <Bar 
                    data={data} 
                    options={options} 
                    className="w-full" 
                />
            </div>
        </div>
    );
};

export default CaseAnalysisCard;