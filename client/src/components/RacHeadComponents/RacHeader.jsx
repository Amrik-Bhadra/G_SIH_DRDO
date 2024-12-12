import React from "react";
import Avatar from "react-avatar";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiNotification2Line } from "react-icons/ri";
import { Badge } from "@mui/material";

const RacHeader = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Determine the time of day and set the appropriate greeting
  const getGreeting = () => {
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center gap-y-4 py-2 px-4 md:px-8">
      {/* Greetings Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-x-3">
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg md:text-2xl text-[#181818]">
            {getGreeting()}
          </h1>
          <h3 className="text-[#585858] font-medium text-sm md:text-base">
            {formattedDate}
          </h3>
        </div>
      </div>

      {/* Notification and Profile Section */}
      <div className="flex items-center gap-x-3">
        {/* Notification Icon */}
        <div
          className="notification bg-white h-[48px] w-[48px] md:h-[53px] md:w-[53px] rounded-full flex justify-center items-center"
          style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
        >
          <Badge badgeContent={4} color="primary">
            <RiNotification2Line color="#0E8CCA" size={"1.4rem"} />
          </Badge>
        </div>

        {/* Profile Section */}
        <div
          className="notification bg-white px-3 md:px-4 h-[48px] md:h-[53px] rounded-full flex justify-center items-center gap-x-2 md:gap-x-3"
          style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
        >
          <Avatar
            name="Amrik Bhadra"
            size="40"
            round
            alt="Amrik Bhadra Avatar"
          />
          <div className="hidden md:block">
            <h1 className="text-[#333] font-medium text-sm">Amrik Bhadra</h1>
            <p className="text-xs text-[#aaa]">amrik.bhadra@mitaoe.ac.in</p>
          </div>
          <IoMdArrowDropdown size={"1.4rem"} color="#0E8CCA" />
        </div>
      </div>
    </header>
  );
};

export default RacHeader;
