import React from "react";

const UpcomingInterviews = () => {
  const interviews = [
    { date: "1 Sept 2024", title: "Radar Technology", department: "Department of Electronics", time: "12:00 to 2:00" },
    { date: "1 Sept 2024", title: "Radar Technology", department: "Department of Electronics", time: "12:00 to 2:00" },
  ];

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-lg font-medium mb-4">Upcoming Interviews</h3>
      <div className="grid grid-cols-2 gap-4">
        {interviews.map((interview, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">{interview.date}</p>
            <h4 className="font-semibold">{interview.title}</h4>
            <p className="text-sm text-gray-500">{interview.department}</p>
            <p className="text-sm text-gray-500">{interview.time}</p>
            <button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded text-sm">
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingInterviews;
