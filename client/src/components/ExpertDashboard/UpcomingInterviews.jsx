import React from "react";
import UpcomingInterviewsCard from "./UpcomingInterviewsCard";

function UpcomingInterviews() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white shadow-md shadow-slate-200 rounded-xl border border-slate-200">
      {/* Header */}
      <div className="w-full h-[20%] flex justify-between items-center p-5">
        <div>
          <h1 className="text-lg -tracking-tight">Upcoming Interviews</h1>
        </div>
        <div className="gap-2 flex">
          <input
            placeholder="Select Month"
            className="border-2 py-1 rounded-lg border-slate-200 outline-none pl-2"
            type="text"
          />
          <input
            placeholder="Select Department"
            className="border-2 py-1 ml-2 rounded-lg border-slate-200 outline-none pl-2"
            type="text"
          />
        </div>
      </div>

      {/* Scrollable Section */}
      <div className="h-[80%] w-fit gap-2 flex flex-grow justify-start p-5 items-center overflow-hidden">
        <div className="w-fit h-full flex overflow-x-scroll scrollbar-hide gap-5">
          <UpcomingInterviewsCard />
          <UpcomingInterviewsCard />
          <UpcomingInterviewsCard />
          <UpcomingInterviewsCard />
        </div>
      </div>
    </div>
  );
}

export default UpcomingInterviews;
