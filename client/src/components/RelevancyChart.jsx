import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RelevancyChart = () => {
  const data = {
    labels: ["D-1", "D-2", "D-3", "D-4", "D-5"],
    datasets: [
      {
        label: "Relevancy Percentage",
        data: [80, 90, 78, 95, 70],
        backgroundColor: "#3b82f6",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-lg font-medium mb-4">Relevancy Percentage</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RelevancyChart;
