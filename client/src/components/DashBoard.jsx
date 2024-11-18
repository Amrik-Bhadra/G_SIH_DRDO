import React from "react";
import DashboardCards from "./DashBoardCards";
import RelevancyChart from "./RelevancyChart";
import InterviewPanelStatus from "./InterviewPanelStatus";
import UpcomingInterviews from "./UpcomingInterviews";

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Dashboard Metrics */}
      <DashboardCards />

      <div className="mt-6 grid grid-cols-2 gap-6">
        {/* Relevancy Chart */}
        <RelevancyChart />

        {/* Interview Panel Status */}
        <InterviewPanelStatus />
      </div>

      {/* Upcoming Interviews */}
      <div className="mt-6">
        <UpcomingInterviews />
      </div>
    </div>
  );
};

export default Dashboard;
