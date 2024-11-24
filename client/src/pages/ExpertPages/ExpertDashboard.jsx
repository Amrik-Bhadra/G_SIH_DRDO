import React, { useContext } from "react";
import { FaAngleDown } from "react-icons/fa";
import logo from "../../assets/images/drdo-logo.svg";
import ExpertNameCard from "../../components/ExpertDashboardSections/ExpertNameCard";
import UpcomingInterviews from "../../components/ExpertDashboardSections/UpcomingInterviews";
import InterviewStatus from "../../components/ExpertDashboardSections/InterviewStatus";
import Calender from "../../components/ExpertDashboardSections/Calender";
import Notifications from "../../components/ExpertDashboardSections/Notifications";
import { AuthContext } from "../../context/AuthenticationContext";

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
        <div className="w-full h-28 flex justify-between items-center px-4 py-2 rounded-md">
          <div className="h-full w-full flex justify-start items-center gap-1 pl-1">
            <img className="w-20 h-auto" src={logo} alt="DRDO Logo" />
            <p className="font-bold text-[#64b5f6] text-2xl">EBRS</p>
          </div>
          <div className="w-52 bg-white shadow-md border-t border-white h-12 flex justify-end items-center rounded-3xl">
            <div className="w-full h-full flex justify-start items-center gap-2 pr-1">
              <div className=" border-2 border-slate-400 w-10 ml-1 text-sm h-10 flex justify-center items-center rounded-full">
                {user?.avatar}
              </div>
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