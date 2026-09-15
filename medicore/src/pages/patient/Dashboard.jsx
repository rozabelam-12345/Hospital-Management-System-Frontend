import History from "../../components/Dashboard-Components/Page-Head.jsx";
import Appointments from "../../components/Dashboard-Components/Appointments";
import Profile from "../../components/Dashboard-Components/Doctor-Profile.jsx";

function Dashboard() {
  return (
    <>
      <History />
      <Profile />
      <Appointments />
    </>
  );
}
export default Dashboard;
