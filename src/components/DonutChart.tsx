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

export const DonutChart = ({ completed, upcoming, labelSize }:any) => {
  const chartRef = useRef<any>(null);

  const actualTotal = completed + upcoming;

  const data = {
    labels: ['Total', 'Upcoming', 'Completed'],
    datasets: [{
      label: 'data',
      data: [actualTotal, upcoming, completed],
      backgroundColor: ['#163066', '#1594CC', '#EBF1FF'],
      borderWidth: 0,
      cutout: '75%',
      borderRadius: 10,
      spacing: 0,
    }]
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          boxHeight: 10,
          padding: 15,
          font: { size: labelSize },
          color: '#9E9E9E',
        },
      },
      tooltip: { enabled: true },
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
        
        // Calculate responsive font sizes based on chart dimensions
        const smallerDimension = Math.min(width, height);
        const mainFontSize = Math.max(smallerDimension * 0.09, 12); // Min font size 12px
        const subFontSize = Math.max(smallerDimension * 0.04, 8); // Min font size 8px
        
        ctx.font = `bold ${mainFontSize}px Arial`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#4B5563';

        const text = actualTotal.toString();
        const textX = width / 2;
        const textY = height / 2;
        
        ctx.fillText(text, textX, textY);

        ctx.font = `${subFontSize}px Arial`;
        ctx.fillStyle = '#525252';
        
        const labelText = 'Total request of this week';
        
        // foe small screens, break text into multiple lines
        if (width < 150) {
          const words = labelText.split(' ');
          const line1 = words.slice(0, 2).join(' ');
          const line2 = words.slice(2).join(' ');
          ctx.fillText(line1, textX, textY - mainFontSize * 0.8);
          ctx.fillText(line2, textX, textY - mainFontSize * 0.8 + subFontSize * 1.2);
        } else {
          ctx.fillText(labelText, textX, textY - mainFontSize * 0.8);
        }
        
        ctx.save();
      }
    };

    if (chartRef.current) {
      const chart = chartRef.current;
      const existingPlugin = ChartJS.registry.plugins.get('centerText');
      if (existingPlugin) {
        ChartJS.unregister(existingPlugin);
      }     
      ChartJS.register(centerTextPlugin);
      
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
    <div className="w-60 md:w-full h-52 sm:h-64 md:h-80 lg:h-96 relative">
      <Doughnut ref={chartRef} data={data} options={options} />
    </div>
  );
};