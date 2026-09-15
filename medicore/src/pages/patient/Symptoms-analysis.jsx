import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import SymptomsHeader from "../../components/Symptoms-Components/page-head";
import SymptomsForm from "../../components/Symptoms-Components/SymptomsForm";
import Describe from "../../components/Symptoms-Components/describe-symptoms";
import AiHelp from "../../components/Symptoms-Components/AI-help";

function Symptoms() {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <SymptomsHeader />
      <div className="flex gap-6">
        <SymptomsForm />
        <AiHelp />
      </div>
    </div>
  );
}
export default Symptoms;
