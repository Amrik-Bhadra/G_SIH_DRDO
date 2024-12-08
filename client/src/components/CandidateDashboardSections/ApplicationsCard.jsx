import React from "react";
import { FcDepartment } from "react-icons/fc";
import { FaBriefcase } from "react-icons/fa6";
import { CircularProgress, Box, Typography } from "@mui/material";

function ApplicationsCard() {
  const applicationstatus = "shortlisted"; // Define the status variable
  const progress = 55; 

  return (
    <div className="min-w-[220px] h-[200px] rounded-2xl border-2 border-slate-200 shadow-md bg-white">
      {/* Date and Title Section */}
      <div className="flex justify-between p-3">
        <p style={{color:"#3C3C3C"}} className="text-lg font-semibold  flex-wrap w-full">
          AI In Defence
        </p>
        <span
          className="rounded-[1000px] border-2 px-1 py-1 font-normal h-fit"
          style={{
            color:
              applicationstatus === "shortlisted"
                ? "#00BD40"
                : applicationstatus === "pending"
                ? "#FF5EF9"
                : "#00BD40", // Default: Industry
            borderColor:
              applicationstatus === "shortlisted"
                ? "#00BD40"
                : applicationstatus === "pending"
                ? "#FF5EF9"
                : "#00BD40", // Default: Industry
            backgroundColor:
              applicationstatus === "shortlisted"
                ? "rgba(8, 151, 255, 0.12)"
                : applicationstatus === "pending"
                ? "rgba(255, 94, 249, 0.1)"
                : "rgba(0, 189, 64, 0.12)", // Default: Industry
          }}
        >
          {applicationstatus}
        </span>
      </div>

      {/* Department and Time Section */}
      <div className="w-full h-[30%] pt-5 flex flex-col px-3">
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-full flex items-center gap-2">
            <div className="text-sm">
              <FcDepartment />
            </div>
            <p className="text-base text-slate-500">Department of AI & ML</p>
          </div>
          <div className="w-full h-full flex items-center gap-2">
            <div className="text-sm text-slate-600">
            <FaBriefcase />
            </div>
            <p className="text-base text-slate-500">Scientist A</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationsCard;
