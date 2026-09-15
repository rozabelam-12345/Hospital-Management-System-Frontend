import Dashboard from "../assets/layout-dashboard.png";
import Symptom from "../assets/robot.png";
import History from "../assets/clipboard-list.png";
import Profile from "../assets/user.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col gap-2">
      <div>
        <p className="text-sm text-gray-400">PATIENT PORTAL</p>
      </div>

      <div className="flex flex-col gap-1">
        <NavLink to="/">
          <button
            onClick={() => setIsClicked(!isClicked)}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-sky-100
              ${isClicked ? "bg-blue-100" : " hover:bg-blue-100"}
          `}>
            <img src={Dashboard} className="w-5 h-5 " />
            <span className="text-sm">Dashboard</span>
          </button>
        </NavLink>

        <NavLink to="/symptoms">
          <button className="   flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-sky-100">
            <img src={Symptom} className="w-5 h-5" />
            <span className="text-sm ">Symptom analysis</span>
          </button>
        </NavLink>

        <NavLink to="/history">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-sky-100">
            <img src={History} className="w-5 h-5" />
            <span className="text-sm">History & records</span>
          </button>
        </NavLink>

        <NavLink to="/profile">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-sky-100">
            <img src={Profile} className="w-5 h-5" />
            <span className="text-sm">My profile</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
