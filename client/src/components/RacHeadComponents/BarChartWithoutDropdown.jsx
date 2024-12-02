import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from "chart.js";

  // Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartWithoutDropdown=() =>{
    //Data for graph
const labels = ["Arohi Kedar","Neha Sharma","Dev Mehra","Ayush Chavhan","Prajwal Patil"];
const dataValues = [85, 70, 65, 90, 75];

const createGradient = (context) => {
    if (!context.chart.chartArea) return null;
    const { ctx, chartArea } = context.chart;
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, "#2AFADF");
    gradient.addColorStop(1, "#4C83FF");
    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Relevancy Percentage",
        data: dataValues,
        backgroundColor: (context) => createGradient(context),
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toFixed(2)}%`,
        },
      },
    },
    layout: {
      padding: { bottom: 0 },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 }, color: "#666" },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20, font: { size: 12 }, color: "#666" },
        grid: { color: "rgba(200, 200, 200, 0.2)" },
      },
    },
    categoryPercentage: 0.9, // Adjust space within categories
    barPercentage: 0.9,
  };

  return(
    <div 
    style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
        
        <div style={{ width: "100%", height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChartWithoutDropdown;