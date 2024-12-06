import React, { useContext } from "react";
import ExpertNameCard from "../../components/ExpertDashboardSections/ExpertNameCard";
import UpcomingInterviews from "../../components/ExpertDashboardSections/UpcomingInterviews";
import InterviewStatus from "../../components/ExpertDashboardSections/InterviewStatus";
import Calender from "../../components/ExpertDashboardSections/Calender";
import Notifications from "../../components/ExpertDashboardSections/Notifications";
import { AuthContext } from "../../context/AuthenticationContext";
import ExpertHeader from "../../components/ExpertDashboardSections/ExpertHeader";

const ExpertDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const userInformation = currentUser?.response;
  console.log(currentUser);
  const user = {
    name: userInformation?.personalDetails?.name?.firstName || "NA",
    email:
      userInformation?.personalDetails?.contact?.email ||
      currentUser?.email ||
      "No email",
    avatar: `${userInformation?.personalDetails?.name?.firstName.slice(0, 1) || "N"}${userInformation?.personalDetails?.name?.lastName?.slice(0, 1) || "A"}`,
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex justify-center items-start">
      <div className="w-[85%] min-h-screen flex flex-col justify-start items-center">
        {/* Header Section */}
        <ExpertHeader user={user}/>

        {/* Main Content Section */}
        <div className="w-full flex-1 flex flex-col gap-2 p-2 md:h-[320px]">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row w-full gap-2  ">
            <div className="w-full md:w-[75%] overflow-hidden md:h-full">
              <UpcomingInterviews />
            </div>
            <div className="w-full md:w-[25%] h-full md:h-[315px]">
              <ExpertNameCard />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row w-full gap-2 md:h-[500px]">
            <div className="w-full md:w-[30%] h-full mb-2 md:mb-0">
              <InterviewStatus />
            </div>
            <div className="w-full md:w-[40%] h-full mb-2 md:mb-0">
              <Notifications />
            </div>
            <div className="w-full md:w-[30%] h-fit mb-2 md:mb-0">
              <Calender />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;