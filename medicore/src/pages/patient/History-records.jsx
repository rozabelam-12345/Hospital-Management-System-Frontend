import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import HistoryRecords from "../../components/History-Components/hist-page-head";
import RecentAppointments from "../../components/History-Components/Recent-appointments";
import Records from "../../components/History-Components/records";

function Historytest() {
  return (
    <>
      <HistoryRecords />
      <RecentAppointments />
      <Records />
    </>
  );
}
export default Historytest;
