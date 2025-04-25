import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

interface ProjectData {
  projectTitle: string;
  startDate: string;
  endDate: string;
}

const LOCAL_STORAGE_KEY = "projectFormDataList";

const PieChart: React.FC = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    series: number[];
  }>({
    labels: [],
    series: [],
  });

  const generateRandomPriority = (): number => {
    return Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
  };

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const projects: ProjectData[] = JSON.parse(storedData);
      const labels: string[] = [];
      const series: number[] = [];

      projects.forEach((project) => {
        labels.push(project.projectTitle);
        const randomPriority = generateRandomPriority();
        series.push(randomPriority);
      });

      setChartData({ labels, series });
    }
  }, []);

  const options = {
    chart: {
      type: "pie",
      height: 350,
    },
    labels: chartData.labels,
    title: {
      text: "Priority Chart",
      align: "center",
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div>
      <ApexCharts
        options={options}
        series={chartData.series}
        type="pie"
        height={350}
        width={400}
      />
    </div>
  );
};

export default PieChart;
