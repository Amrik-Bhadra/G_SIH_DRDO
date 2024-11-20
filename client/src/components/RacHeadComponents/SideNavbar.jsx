import React, { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import logo from "../../assets/images/drdo-logo.svg";
import NavItems from "./NavItems";

const SideNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <aside
      className={`flex flex-col items-center justify-center relative top-0 left-0 bg-white transition-all duration-300 ${
        isCollapsed ? "w-[8%]" : "w-[18%]"
      } h-full px-8 gap-y-10`}
      style={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"}}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-2 -right-6 text-[#0E8CCA] text-3xl px-2 py-1 rounded"
      >
        {isCollapsed ? (
          <IoIosArrowDroprightCircle />
        ) : (
          <IoIosArrowDropleftCircle />
        )}
      </button>

      {/* sidebar-header */}
      <div className="sidebarheader flex justify-center items-center gap-x-3 w-full">
        {isCollapsed ? (
          <img src={logo} alt="drdo-logo" className="w-16" />
        ) : (
          <img src={logo} alt="drdo-logo" className="w-20" />
        )}

        {isCollapsed ? (
          <h1 className="hidden text-3xl font-bold text-[#0E8CCA]">E.B.R.S.</h1>
        ) : (
          <h1 className="text-3xl font-bold text-[#0E8CCA]">E.B.R.S.</h1>
        )}
      </div>

      {/* sidenav bar items */}
      <div className="sidenavbar w-full flex flex-col gap-y-10">
        <div className="sidenavbar-g1 w-full flex flex-col gap-y-2">
          <span className="group-header text-[#bbb]">MENU</span>
          <ul className="group-menu-box flex flex-col gap-y-3">
            <li className="group-menu-items flex">
              <NavItems
                link="/rachead/"
                title="Dashboard"
                icon={TbLayoutDashboardFilled}
                isCollapsed={isCollapsed}
              />
            </li>
            <li className="group-menu-items flex">
              <NavItems
                link="/rachead/analytics"
                title="Analyitcs"
                icon={IoAnalytics}
                isCollapsed={isCollapsed}
              />
            </li>
            <li className="group-menu-items flex">
              <NavItems
                link="/rachead/pannels"
                title="Pannels"
                icon={MdGroups}
                isCollapsed={isCollapsed}
              />
            </li>
          </ul>
        </div>

        <div className="sidenavbar-g2 w-full flex flex-col gap-y-2">
          <span className="group-header text-[#bbb]">TOOLS</span>
          <ul className="group-menu-box flex flex-col gap-y-3">
            <li className="group-menu-items flex"></li>
            <NavItems
              link="/rachead/settings"
              title="Settings"
              icon={IoSettingsSharp}
              isCollapsed={isCollapsed}
            />
            <li className="group-menu-items flex">
              <NavItems
                link="/rachead/help"
                title="Help"
                icon={IoIosHelpCircleOutline}
                isCollapsed={isCollapsed}
              />
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SideNavbar;
