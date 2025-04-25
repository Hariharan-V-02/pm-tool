import React from 'react';
import ApexCharts from 'react-apexcharts';

const GaugeChart: React.FC = () => {
  const options = {
    chart: {
      type: 'radialBar',
      height: 350,
      toolbar: {
        show: false, // Hide toolbar
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 5,
          size: '50%',
          background: 'transparent',
        },
        track: {
          background: '#f2f2f2',
          strokeWidth: '100%',
        },
        dataLabels: {
          show: true,
          name: {
            fontSize: '24px',
            color: '#333',
          },
          value: {
            fontSize: '36px',
            color: '#333',
          },
        },
        // Needle customization
        needle: {
          show: true,
          width: 4,
          length: '80%',
          color: '#FF5733', // Needle color
        },
      },
    },
    labels: ['Speedometer'],
    colors: ['#00FF00'],
    series: [70], 
    
  };

  return (
    <div>
      <ApexCharts options={options} series={options.series} type="radialBar" height={350} />
    </div>
  );
};

export default GaugeChart;
