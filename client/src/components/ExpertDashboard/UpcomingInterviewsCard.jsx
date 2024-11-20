import React from "react";
import { FcDepartment } from "react-icons/fc";
import { GoClock } from "react-icons/go";
import { FaSpinner } from "react-icons/fa6";
function UpcomingInterviewsCard() {
  return (
    <div className="w-[220px] p-2 h-full rounded-2xl border-2 border-slate-200 shadow-md bg-white">
      <div className="w-full h-[40%] flex gap-2 justify-center items-center">
        <div className="w-1/3 h-full bg-gradient-to-r rounded-2xl flex justify-center items-center from-[#1565c0] via-[#42a5f5] to-[#64b5f6] ">
          <p className="text-white text-center text-md font-semibold flex-wrap">
            1 Sept 2024
          </p>
        </div>
        <div className="w-2/3 h-full flex justify-center items-center">
          <p className="text-lg text-center font-semibold text-slate-800 flex-wrap w-full">
            AI In Defence
          </p>
        </div>
      </div>
      <div className="w-full h-[30%] pt-5 flex flex-col justify-center items-center">
        <div className="w-full h-full flex flex-col justify-center items-center gap-2">
          <div className=" w-full h-full flex justify-center gap-2 items-center">
            <div className="text-sm">
              <FcDepartment />
            </div>
            <p className="text-xs text-slate-500">Department of AI & ML</p>
          </div>
          <div className=" w-full h-full flex gap-2 justify-center items-center">
            <div className="text-sm text-slate-700">
              <GoClock />
            </div>
            <p className="text-xs text-slate-500">12:00 AM - 2:00 PM</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[30%] mt-2 flex justify-between items-center">
        <button className="w-1/2 py-1 rounded-md text-white bg-slate-800">
          Open
        </button>
        <p className="w-1/2 h-full flex justify-center items-center text-4xl">
          <FaSpinner />
        </p>
      </div>
    </div>
  );
}

export default UpcomingInterviewsCard;
