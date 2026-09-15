import Sidebar from "../Sidebar";
import Header from "../Header";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default DashboardLayout;
