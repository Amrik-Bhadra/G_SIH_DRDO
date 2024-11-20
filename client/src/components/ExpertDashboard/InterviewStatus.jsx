import React from "react";

function InterviewStatus() {
  return (
    <div className="w-full h-full border-2 pl-5 bg-white pr-5 border-slate-200 shadow-md rounded-2xl">
      <div className="w-full h-full">
        <div className="w-full h-[20%] flex justify-between items-center ">
          <p className="text-xl -tracking-tight font-semibold text-slate-800">
            Interview Status
          </p>
          <button className="px-2 py-1 rounded-lg bg-slate-200 text-slate-700">
            View Report
          </button>
        </div>
        <div className="w-full h-[80%] flex justify-center items-center">
          <img
            src="https://jonmgomes.com/wp-content/uploads/2020/06/Screen-Shot-2020-06-18-at-1.25.41-PM.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default InterviewStatus;
