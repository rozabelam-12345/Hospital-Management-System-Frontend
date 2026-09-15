import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./app/ProtectedRoute";
//Patients
import Dashboard from "./pages/patient/Dashboard";
import Profile from "./pages/patient/My-profile";
import Symptoms from "./pages/patient/Symptoms-analysis";
import Historytest from "./pages/patient/History-records";

//Admin
import Overview from "./pages/admin/Overview";
import Patients from "../src/pages/admin/Patients";

//Doctor
import DocDashboard from "./pages/doctor/DoctorDashboard";

//Login
import EntryPage from "./pages/login-logout/EntryPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<EntryPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/history" element={<Historytest />} />
            <Route path="/admin/patients" element={<Patients />} />
          </Route>
        </Route>

        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  );
}
