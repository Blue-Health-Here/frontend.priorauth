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
import { useState } from "react";
import { timeRanges } from "@/utils/constants";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InsuranceWiseChart = () => {
    const [range, setRange] = useState("Today");

    const datasetsByRange: any = {
        Today: [
            [1800, 1902, 1600, 1710, 1750, 1778, 1430, 1967, 1559, 2305, 856, 2245],
            [300, 400, 250, 320, 300, 420, 200, 330, 210, 280, 120, 180],
        ],
        W: [
            [1500, 1600, 1300, 1400, 1450, 1500, 1200, 1600, 1250, 1900, 700, 2000],
            [250, 300, 200, 280, 250, 300, 180, 280, 190, 250, 100, 150],
        ],
        M: [
            [8000, 8200, 7500, 7700, 7900, 8000, 6800, 8500, 7200, 9000, 3400, 8800],
            [1000, 1200, 800, 950, 1100, 1250, 750, 1000, 900, 1100, 400, 950],
        ],
        Y: [
            [95000, 98000, 91000, 93000, 94000, 96000, 87000, 100000, 89000, 105000, 41000, 102000],
            [11000, 12000, 10000, 11500, 10800, 13000, 9000, 11000, 10000, 12000, 5000, 11000],
        ],
    };

    const [approved, denied] = datasetsByRange[range];

    const data = {
        labels: [
            "Golden State Health Plan",
            "CareSource Insurance",
            "Pacific Blue Cross",
            "Northstar Health",
            "Sunrise Health Insurance",
            "Aspire Health Network",
            "Evergreen Health Plan",
            "Summit Health Insurance",
            "Celtic Insurance Group",
            "Sunrise Health Insurance",
            "Bright Path Health",
            "Aspire Health Network",
        ],
        datasets: [
            {
                label: "Approval",
                backgroundColor: "#5CE543",
                data: approved,
                borderRadius: 10,
            },
            {
                label: "Denial",
                backgroundColor: "#FF7E7E",
                data: denied,
                borderRadius: 10,
            },
        ],
    };

    const options: any = {
        indexAxis: "y",
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: false },
        },
        scales: {
            x: {
                grid: {
                    display: true // Removes vertical grid lines (appear horizontal in horizontal bar chart)
                }
            },
            y: {
                grid: {
                    display: false // Removes horizontal grid lines (appear vertical in horizontal bar chart)
                }
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl p-4 theme-shadow w-full">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Insurance wise Analysis</h2>
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

export default InsuranceWiseChart;