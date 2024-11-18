import React from "react";
import { Notifications, Search } from "@mui/icons-material";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">Good Morning!</h2>
        <p className="text-gray-500">Sunday, September 8 2024</p>
      </div>
      <div className="flex items-center space-x-4">
        <Search className="text-gray-500" />
        <Notifications className="text-gray-500" />
        <div className="flex items-center space-x-2">
          <img
            src="/profile.jpg"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Amrik Bhadra</p>
            <p className="text-sm text-gray-500">amrik.bhadra@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
