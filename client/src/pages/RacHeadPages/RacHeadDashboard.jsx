import React, { useState } from "react";
import SideNavbar from "../../components/RacHeadComponents/SideNavbar";
import RacHeader from "../../components/RacHeadComponents/RacHeader";
import DashboardNumberCards from "../../components/RacHeadComponents/DashboardNumberCards";
import Grid from "@mui/material/Grid2";
import { Chip } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import AreaChartComponent from "../../components/ChartsComponents/AreaChartComponent";

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
            <Grid size={5} sx={{border:"2px solid red", borderRadius:"10px"}}>
              {/* number cards */}
              <Grid container rowSpacing={2} columnSpacing={2}>
                <DashboardNumberCards numberCardsStyle={numberCardsStyle} title="Total Experts" para="56" Icon={FaUser} />
                <DashboardNumberCards numberCardsStyle={numberCardsStyle} title="Total Experts" para="56" Icon={FaUser} />
                <DashboardNumberCards numberCardsStyle={numberCardsStyle} title="Total Experts" para="56" Icon={FaUser} />
                <DashboardNumberCards numberCardsStyle={numberCardsStyle} title="Total Experts" para="56" Icon={FaUser} />
              </Grid>
            </Grid>
            <Grid size={7} sx={{border:"2px solid red", borderRadius:"10px", background:"#fff"}}>
              {/* <AreaChartComponent/> */}
            </Grid>
            <Grid size={4}></Grid>
            <Grid size={8}></Grid>
          </Grid>
        </div>
      </main>
    </section>
  );
};

export default RacHeadDashboard;
