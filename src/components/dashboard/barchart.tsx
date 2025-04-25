import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

interface ProjectData {
  projectTitle: string;
  startDate: string;
  endDate: string;
}

const LOCAL_STORAGE_KEY = "projectFormDataList";

const BarChart: React.FC = () => {
  const [projectNames, setProjectNames] = useState<string[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const projects: ProjectData[] = JSON.parse(storedData);
      const names = projects.map((project) => project.projectTitle);
      setProjectNames(names);
    }
  }, []);

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "flat",
      },
    },
    xaxis: {
      categories: projectNames,
    },
    yaxis: {
      title: {
        text: "Days",
      },
    },
    title: {
      text: "Project Days Count",
      align: "center",
    },
  };

  const series = [
    {
      name: "No Of Days",
      data: Array(projectNames.length).fill(8),
    },
  ];

  return (
    <div>
      <ApexCharts
        options={options}
        series={series}
        type="bar"
        height={350}
        width={700}
      />
    </div>
  );
};

export default BarChart;
