import React from "react";
import { FaAngleDown } from "react-icons/fa";
import logo from "../../assets/images/drdo-logo.svg";
import UpcomingInterviews from "../../components/CandidateDashboardSections/UpcomingInterview";
import ProfileCard from "../../components/CandidateDashboardSections/ProfileCard";
import InterviewStatusChart from "../../components/CandidateDashboardSections/InterviewStatusCard";
import Notifications from "../../components/CandidateDashboardSections/Notifications";
import CalenderCard from "../../components/CandidateDashboardSections/CalenderCard";
import CandidateNameCard from "../../components/CandidateDashboardSections/CandidateNameCard";

const CandidateDashboard = () => {
  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] scroll-smooth flex justify-center items-start">
      <div className="w-full md:w-[85%] min-h-screen ">
        <div className="w-full h-28 flex justify-between items-center">
          <div className="h-full flex justify-start items-center gap-1 pl-1">
            <img className="w-20 h-fit" src={logo} alt="" />
            <p className="font-bold text-[#64b5f6] text-2xl">EBRS</p>
          </div>
          <div className="w-52 bg-white shadow-md border-t border-white h-12 justify-end items-center rounded-3xl">
            <div className="w-full h-full flex justify-start items-center gap-2 pr-1">
              <img
                className="h-11 pl-1"
                src="https://cdn-icons-png.flaticon.com/512/700/700674.png"
                alt=""
              />
              <div className="">
                <p className="font-semibold">Rahul Rastogi</p>
                <p className="text-[9px]">rahul.rashtogi@gmail.com</p>
              </div>
              <div className="hover:text-slate-600">
                <FaAngleDown />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full min-h-screen flex flex-col justify-center items-start ">
          <div className="w-full h-full md:h-[320px] p-2 md:flex justify-between items-center gap-5">
            <div className="w-full md:w-[75%] md:h-[300px] h-[350px] overflow-hidden p-2">
              <UpcomingInterviews />
            </div>
            <div className="w-full md:w-[25%] h-[300px]">
              <CandidateNameCard />
            </div>
          </div>
          <div className="w-full h-[450px] p-2 md:flex justify-between items-center md:gap-5">
            <div className="w-full md:w-[30%] h-full mb-2 md:mb-0">
              <InterviewStatusChart />
            </div>
            <div className="w-full md:w-[30%] h-full mb-2 md:mb-0">
              <CalenderCard />
            </div>
            <div className="w-full md:w-[40%] h-full mb-2 md:mb-0">
              <Notifications />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
