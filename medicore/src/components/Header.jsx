import { NavLink } from "react-router-dom";
import logout from "../assets/logout.png";

function Header() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <div>
          <p className="text-base font-bold text-gray-800">MediCore</p>
          <p className="text-xs text-gray-500">Hospital Management</p>
        </div>
      </div>

      <div className=" flex items-center gap-3 border border-gray-200 rounded-full px-3 py-2  hover:bg-gray-100 cursor-auto">
        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center ">
          <span className="text-blue-900 font-bold text-sm">AM</span>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-800">Anna Markovic</p>
          <p className="text-xs text-gray-500">Patient</p>
        </div>
        <NavLink to="/login">
          <img src={logout} className="w-6 h-6" />
        </NavLink>
      </div>
    </div>
  );
}
export default Header;
