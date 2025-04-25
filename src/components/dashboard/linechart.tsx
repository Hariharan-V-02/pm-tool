import React from 'react';
import ApexCharts from 'react-apexcharts';

const LineChart: React.FC = () => {
  const options = {
    chart: {
      type: 'line',
      height: 350,
    },
    title: {
      text: 'Work Flow',
      align: 'center',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis labels
    },
    stroke: {
      curve: 'smooth', 
    },
    grid: {
      borderColor: '#f1f1f1',
    },
  };

  const series = [
    {
      name: ' Project Completion',
      data: [10, 25, 35, 50, 60, 70, 80],
    },
  ];

  return (
    <div>
      <ApexCharts options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineChart;
