import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

const InterviewPanelStatus = () => {
  const data = {
    labels: ["In Progress", "Completed", "Upcoming"],
    datasets: [
      {
        data: [29, 43, 38],
        backgroundColor: ["#3b82f6", "#10b981", "#6366f1"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Allows resizing
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-lg font-medium mb-4">Interview Panel Status</h3>
      {/* Set custom height and width */}
      <div style={{ position: "relative", width: "500px", height: "270px", margin: "auto" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default InterviewPanelStatus;
