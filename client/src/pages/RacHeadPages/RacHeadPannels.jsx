import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import SideNavbar from "../../components/RacHeadComponents/SideNavbar";
import RacHeader from "../../components/RacHeadComponents/RacHeader";
import PanelCards from "../../components/RacHeadComponents/PanelCards";
import "../../styles/RacHeadStyle.css";

const RacHeadPannels = () => {
  const navigate = useNavigate();
  
  return (
    <section className="h-screen w-screen flex bg-[#f6f6f6]">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <main className="relative flex px-8 py-4 flex-col w-full gap-y-12 pt-6">
        <RacHeader />
        <div className="main-content flex justify-between items-center">
          <h2 className="font-semibold text-[#464646] text-xl">
            Interview Panels
          </h2>
          <div className="button-grp flex gap-x-3 items-center">
            {/* Select Department Filter */}
            <FormControl
              sx={{
                background: "#fff",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "6px",
                minWidth: "180px", // Ensures enough space for content
              }}
            >
              <InputLabel id="role-select-label">Select Department</InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                label="Select Department"
                sx={{
                  textAlign: "left",
                }}
              >
                <MenuItem value="applicant">Applicant</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
              </Select>
            </FormControl>

            {/* Select Interview Status Filter */}
            <FormControl
              sx={{
                background: "#fff",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "6px",
                minWidth: "220px", // Adjust as per content
              }}
            >
              <InputLabel id="interview-status-select-label">
                Select Interview Status
              </InputLabel>
              <Select
                labelId="interview-status-select-label"
                id="interview-status-select"
                label="Select Interview Status"
                sx={{
                  textAlign: "left",
                }}
              >
                <MenuItem value="applicant">Upcoming</MenuItem>
                <MenuItem value="expert">Inprogress</MenuItem>
                <MenuItem value="expert">Completed</MenuItem>
              </Select>
            </FormControl>

            {/* Button */}
            <Button
              variant="contained"
              sx={{
                padding: "14px 16px", // Adjust padding for better sizing
                fontSize: "0.875rem", // Match MUI typography
                backgroundColor: "#464646",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}

              onClick={()=>{navigate('/rachead/createPanel')}}
            >
              Create Panel
            </Button>
          </div>
        </div>

        {/* pannels card container starts */}
        <div
          className="pannels-container flex flex-wrap gap-y-5 gap-x-6 overflow-y-auto"
          style={{
            height: "calc(100% - 150px)", // Adjust height dynamically
            paddingBottom: "16px",
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For Internet Explorer and Edge
          }}
        >
          <PanelCards />
          <PanelCards />
          <PanelCards />
          <PanelCards />
        </div>
      </main>

      
    </section>
  );
};

export default RacHeadPannels;
