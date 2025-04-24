// import React from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
// ChartJS.register(ArcElement, Tooltip, Legend);

// interface DonutChartProps {
//   totalRequests: number;
//   completedRequests: number;
// }

// const DonutChart: React.FC<DonutChartProps> = ({ totalRequests, completedRequests }) => {
//   const upcomingRequests = totalRequests - completedRequests;
  
//   const data = {
//     datasets: [
//       {
//         data: [upcomingRequests, completedRequests],
//         backgroundColor: ['#192f59', '#1a9bd8'],
//         borderWidth: 0,
//         cutout: '75%'
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false
//       },
//       tooltip: {
//         enabled: true
//       }
//     }
//   };

//   return (
//     <div className="w-full bg-primary-white rounded-2xl p-5 shadow-lg">
//       <h2 className="text-sm md:text-base lg:text-lg text-secondary-black font-secondary">Total Requests</h2>
//       <p className="text-tertiary-black xt-xs md:text-sm lg:text-base leading-[120%] mt-2">
//         Total no. of Sessions/sessions Doctors need to attend.
//       </p>
      
//       <div className="relative h-64 w-full">
//         <Doughnut data={data} options={options} />
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <span className="text-gray-500 text-sm">Total request of this week</span>
//           <span className="text-4xl font-bold text-gray-800">{totalRequests}</span>
//         </div>
//       </div>  
//       <div className="flex items-center justify-center mt-4 space-x-4 text-tertiary-black">
//         <div className="flex items-center">
//           <div className="h-3 w-3 rounded-full bg-gray-200"></div>
//           <span className="ml-1 text-sm">Total</span>
//         </div>
//         <div className="flex items-center">
//           <div className="h-3 w-3 rounded-full bg-[#192f59]"></div>
//           <span className="ml-1 text-sm">Upcoming</span>
//         </div>
//         <div className="flex items-center">
//           <div className="h-3 w-3 rounded-full bg-[#1a9bd8]"></div>
//           <span className="ml-1 text-sm">Completed</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonutChart



import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type DonutChartProps = {
  completed: number;
  upcoming: number;
  total: number;
};

export const DonutChart = ({ completed, upcoming, total }: DonutChartProps) => {
const data = {
    labels: [
      'Total',
      'Upcoming',
      'Completed'
    ],
    datasets: [{
      label: 'data',
      data: [total, upcoming,completed],
      backgroundColor: ['#163066', '#1594CC','#EBF1FF'],
      borderWidth: 0,
      cutout: '75%',
      borderRadius: 10, 
      spacing: 0,
    }]
  };
const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 10, 
          boxHeight: 10,
          padding: 15, 
          font: {
            size: 14, 
          },
          color: '#6B7280',
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="max-h-48 max-w-48 ">
        <Doughnut data={data} options={options} />
    </div>
  );
};
