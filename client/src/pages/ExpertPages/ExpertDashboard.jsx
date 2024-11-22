import React from "react";
import { FaAngleDown } from "react-icons/fa";
import logo from "../../assets/images/drdo-logo.svg";
import ExpertNameCard from "../../components/ExpertDashboardSections/ExpertNameCard";
import UpcomingInterviews from "../../components/ExpertDashboardSections/UpcomingInterviews";
import InterviewStatus from "../../components/ExpertDashboardSections/InterviewStatus";
import Calender from "../../components/ExpertDashboardSections/Calender";
import Notifications from "../../components/ExpertDashboardSections/Notifications";

const ExpertDashboard = () => {
  // Dynamic user data (could be fetched from an API in real-world apps)
  const user = {
    name: "Rahul Rastogi",
    email: "rahul.rashtogi@gmail.com",
    avatar: "https://cdn-icons-png.flaticon.com/512/700/700674.png",
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] scroll-smooth flex justify-center items-start">
      <div className="w-full md:w-[85%] min-h-screen">
        {/* Header Section */}
        <div className="w-full h-28 flex justify-between items-center">
          <div className="h-full flex justify-start items-center gap-1 pl-1">
            <img className="w-20 h-fit" src={logo} alt="DRDO Logo" />
            <p className="font-bold text-[#64b5f6] text-2xl">EBRS</p>
          </div>
          <div className="w-52 bg-white shadow-md border-t border-white h-12 flex justify-end items-center rounded-3xl">
            <div className="w-full h-full flex justify-start items-center gap-2 pr-1">
              <img
                className="h-11 pl-1 rounded-full"
                src={user.avatar}
                alt={`${user.name}'s Avatar`}
                onError={(e) => (e.currentTarget.src = "/default-avatar.png")} // Fallback for broken avatar
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-[9px]">{user.email}</p>
              </div>
              <div className="hover:text-slate-600">
                <FaAngleDown />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="w-full min-h-screen flex flex-col justify-center items-start">
          {/* Top Section */}
          <div className="w-full h-full md:h-[320px] p-2 md:flex justify-between items-center gap-5">
            <div className="w-full md:w-[75%] md:h-[300px] h-[350px] overflow-hidden p-2">
              <UpcomingInterviews />
            </div>
            <div className="w-full md:w-[25%] h-[300px]">
              <ExpertNameCard />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="w-full h-full md:h-[500px] p-2 md:flex justify-between items-start md:gap-3">
            <div className="w-full h-full gap-3 md:flex justify-center items-center">
              <div className="w-full md:w-[50%] h-full mb-2 md:mb-0">
                <InterviewStatus />
              </div>
              <div className="w-full md:w-[50%] h-full mb-2 md:mb-0">
                <Notifications />
              </div>
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
