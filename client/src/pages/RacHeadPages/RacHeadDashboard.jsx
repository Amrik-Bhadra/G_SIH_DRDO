import React, { useState } from "react";
import SideNavbar from "../../components/RacHeadComponents/SideNavbar";
import RacHeader from "../../components/RacHeadComponents/RacHeader";



const RacHeadDashboard = () => {
  

  return (
    <section className="h-screen w-screen flex bg-[#f6f6f6]">
      {/* Sidebar */}
      <SideNavbar/>

      {/* Main Content */}
      <main className="relative flex-grow px-8 py-6">
        <RacHeader/>
      </main>
    </section>
  );
};

export default RacHeadDashboard;
