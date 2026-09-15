import { useState } from "react";
import CreateAccount from "../../components/Login-Singup/CreateAcc";
import Logout from "../../components/Login-Singup/Logout";
import SignIn from "../../components/Login-Singup/SignIn";

function EntryPage() {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className="grid grid-cols-2 min-h-screen  overflow-hidden">
      <Logout />

      <div className="flex items-center justify-center min-h-screen overflow-y-auto">
        {activeTab === "signin" ? (
          <SignIn activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <CreateAccount activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
}
export default EntryPage;
