import React from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoNotificationsOffSharp } from "react-icons/io5";
import NotificationUserCard from "./NotificationUserCard";

function Notifications() {
  return (
    <div className="w-full h-full pl-5 pr-5 bg-white border-2 border-slate-200 shadow-md rounded-2xl p-2 flex flex-col justify-start items-center">
      <div className="w-full h-[20%] flex justify-between items-center p-2">
        <p className="text-xl -tracking-tight font-semibold text-slate-800">
          Notifications
        </p>
        <div className="w-[65px] h-[32px] rounded-full flex border-2 border-slate-800">
          <div className="w-[30px] h-full rounded-full bg-blue-300 text-2xl flex justify-center items-center">
            <IoNotificationsSharp />
          </div>
          <div className="w-[30px] h-full rounded-full text-2xl flex justify-center items-center">
            <IoNotificationsOffSharp />
          </div>
        </div>
      </div>
      <div className="w-full h-[80%] flex flex-col gap-2 overflow-hidden">
        <div className="w-full h-full overflow-y-scroll scrollbar-hide">
          <NotificationUserCard />
          <NotificationUserCard />
          <NotificationUserCard />
          <NotificationUserCard />
          <NotificationUserCard />
          <NotificationUserCard />
          <NotificationUserCard />
          <NotificationUserCard />
          <NotificationUserCard />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
