import React, { useState } from "react";
import SideNavbar from "../../components/RacHeadComponents/SideNavbar";
import RacHeader from "../../components/RacHeadComponents/RacHeader";
import Grid from "@mui/material/Grid2";
import { Chip } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";

const RacHeadDashboard = () => {
  const numberCardsStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1.2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.3rem 0",
  };

  return (
    <section className="h-screen w-screen flex bg-[#f6f6f6]">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <main className="relative flex flex-col flex-grow gap-y-8 px-8 py-6 ">
        <RacHeader />

        <div className="pannels-container flex flex-grow gap-y-5 gap-x-5">
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid size={5}>
              {/* number cards */}
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid size={6} sx={numberCardsStyle}>
                  <div className="flex justify-between">
                    <div
                      className="icon-box p-3 rounded-lg text-[#979797] bg-[#F9F9F9]"
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                    >
                      <FaUser />
                    </div>
                    <Chip
                      label="+ 0.07%"
                      variant="filled"
                      sx={{
                        background: "#00B65E",
                        color: "#fff",
                        fontWeight: "600",
                      }}
                    />
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-[#3C8CE7] font-semibold text-sm">
                        Total Experts
                      </p>
                      <h1 className="text-[#1E1E1E] font-bold text-3xl">56</h1>
                    </div>
                    <div></div>
                  </div>
                </Grid>
                <Grid size={6} sx={numberCardsStyle}>
                  <div className="flex justify-between">
                    <div
                      className="icon-box p-3 rounded-lg text-[#979797] bg-[#F9F9F9]"
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                    >
                      <MdGroups />
                    </div>
                    <Chip
                      label="+ 0.07%"
                      variant="filled"
                      sx={{
                        background: "#00B65E",
                        color: "#fff",
                        fontWeight: "600",
                      }}
                    />
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-[#3C8CE7] font-semibold text-sm">
                        Total Active Panels
                      </p>
                      <h1 className="text-[#1E1E1E] font-bold text-3xl">56</h1>
                    </div>
                    <div></div>
                  </div>
                </Grid>
                <Grid size={6} sx={numberCardsStyle}>
                  <div className="flex justify-between">
                    <div
                      className="icon-box p-3 rounded-lg text-[#979797] bg-[#F9F9F9]"
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                    >
                      <RiCalendarScheduleFill />
                    </div>
                    <Chip
                      label="+ 0.07%"
                      variant="filled"
                      sx={{
                        background: "#00B65E",
                        color: "#fff",
                        fontWeight: "600",
                      }}
                    />
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-[#3C8CE7] font-semibold text-sm">
                        Interview Scheduled
                      </p>
                      <h1 className="text-[#1E1E1E] font-bold text-3xl">56</h1>
                    </div>
                    <div></div>
                  </div>
                </Grid>
                <Grid size={6} sx={numberCardsStyle}>
                  <div className="flex justify-between">
                    <div
                      className="icon-box p-3 rounded-lg text-[#979797] bg-[#F9F9F9]"
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                    >
                      <RiCalendarScheduleFill />
                    </div>
                    <Chip
                      label="+ 0.07%"
                      variant="filled"
                      sx={{
                        background: "#00B65E",
                        color: "#fff",
                        fontWeight: "600",
                      }}
                    />
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-[#3C8CE7] font-semibold text-sm">
                        Total Experts
                      </p>
                      <h1 className="text-[#1E1E1E] font-bold text-3xl">56</h1>
                    </div>
                    <div></div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={6}></Grid>
            <Grid size={4}></Grid>
            <Grid size={8}></Grid>
          </Grid>
        </div>
      </main>
    </section>
  );
};

export default RacHeadDashboard;
