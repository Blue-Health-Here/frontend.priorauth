import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { useRef, useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

type DonutChartProps = {
  completed: number;
  upcoming: number;
};

export const DonutChart = ({ completed, upcoming}: DonutChartProps) => {
  const chartRef = useRef<any>(null);

  const actualTotal =  completed + upcoming;
  
  const data = {
    labels: [
      'Total',
      'Upcoming',
      'Completed'
    ],
    datasets: [{
      label: 'data',
      data: [actualTotal, upcoming,completed],
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
          color: '##9E9E9E',
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  useEffect(() => {
    const centerTextPlugin = {
      id: 'centerText',
      afterDraw: (chart: any) => {
        const width = chart.width;
        const height = chart.height;
        const ctx = chart.ctx;
        
        ctx.restore();
        ctx.font = 'bold 24px Arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#4B5563';
        
        const text = actualTotal.toString();
        const textX = width / 2;
        const textY = height / 2;
        
        ctx.fillText(text, textX, textY);
        
        ctx.font = '12px Arial';
        ctx.fillStyle = '##525252';
        ctx.fillText('Total request of this week', textX, textY - 25);
        ctx.save();
      }
    };

    if (chartRef.current) {
      const chart = chartRef.current;
      const registeredPlugin = ChartJS.registry.plugins.get('centerText');
      if (!registeredPlugin) {
        ChartJS.register(centerTextPlugin);
      }
      
      if (chart.chart) {
        chart.chart.update();
      }
    }
    
    return () => {
      const registeredPlugin = ChartJS.registry.plugins.get('centerText');
      if (registeredPlugin) {
        ChartJS.unregister(registeredPlugin);
      }
    };
  }, [actualTotal]);

  return (
    <div className="max-h-80 max-w-80 ">
        <Doughnut ref={chartRef}   data={data} options={options} />
    </div>
  );
};