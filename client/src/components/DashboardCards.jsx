import React from "react";

const DashboardCards = () => {
  const metrics = [
    { title: "Total Experts", value: 56, change: "-2.07%", positive: false },
    { title: "Total Active Panel", value: 34, change: "+1.87%", positive: true },
    { title: "Interview Scheduled", value: 21, change: "+0.07%", positive: true },
    { title: "Total Applications", value: 56, change: "-1.07%", positive: false },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white shadow-md p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-600">{metric.title}</p>
          <h2 className="text-2xl font-bold">{metric.value}</h2>
          <p
            className={`text-sm font-medium ${
              metric.positive ? "text-green-500" : "text-red-500"
            }`}
          >
            {metric.change}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
