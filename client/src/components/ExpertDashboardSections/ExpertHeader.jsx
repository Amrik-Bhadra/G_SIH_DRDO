import React from "react";
import { FaAngleDown } from "react-icons/fa";
import logo from "../../assets/images/drdo-logo.svg";

const ExpertHeader = ({ user }) => {
  return (
    <div className="w-full h-28 flex justify-between items-center px-4 py-2 rounded-md">
      <div className="h-full w-full flex justify-start items-center gap-1 pl-1">
        <img className="w-20 h-auto" src={logo} alt="DRDO Logo" />
        <p className="font-bold text-[#64b5f6] text-2xl">EBRS</p>
      </div>
      <div className="w-52 bg-white shadow-md border-t border-white h-12 flex justify-end items-center rounded-3xl">
        <div className="w-full h-full flex justify-start items-center gap-2 pr-1">
          <div className=" border-2 border-slate-400 w-10 ml-1 text-sm h-10 flex justify-center items-center rounded-full">
          {user.name.firstName[0]}{user.name.lastName[0]}
          </div>
          <div>
            <p className="font-semibold">{user.name.firstName} {user.name.lastName}</p>
            {/* <p className="font-semibold">{user.name}</p> */}
            <p className="text-[9px]">{user.contact.email}</p>
          </div>
          <div className="hover:text-slate-600">
            <FaAngleDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertHeader;