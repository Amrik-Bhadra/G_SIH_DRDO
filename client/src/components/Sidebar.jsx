import React from "react";
import { Home, Analytics, Group, Settings, HelpOutline } from "@mui/icons-material";
import logo from "../assets/images/drdo-logo.svg";

const Sidebar = () => {
  return (
    <aside className="w-60 bg-white shadow-md h-full flex flex-col">
      <div className="flex items-center justify-center py-10">
        <img src={logo} alt="EBRS Logo" className="w-12 h-12" />
        <h1 className="ml-3 text-xl font-bold text-blue-500">EBRS</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-5 px-4">
          <li className="flex items-center text-blue-500 font-semibold">
            <Home className="mr-3" /> Dashboard
          </li>
          <li className="flex items-center text-gray-600">
            <Analytics className="mr-3" /> Analytics
          </li>
          <li className="flex items-center text-gray-600">
            <Group className="mr-3" /> Panels
          </li>
        </ul>
        <h3 className="px-4 mt-6 text-gray-400 uppercase text-sm">Tools</h3>
        <ul className="mt-3 space-y-4 px-4">
          <li className="flex items-center text-gray-600">
            <Settings className="mr-3" /> Settings
          </li>
          <li className="flex items-center text-gray-600">
            <HelpOutline className="mr-3" /> Help
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
