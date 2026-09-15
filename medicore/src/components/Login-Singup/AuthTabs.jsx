function AuthTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex bg-gray-100 rounded-xl p-1 w-fit text-sm ">
      <button
        onClick={() => setActiveTab("signin")}
        className={`px-6 py-2 rounded-xl font-medium ${
          activeTab === "signin"
            ? "bg-white shadow font-semibold text-gray-900 text-sm"
            : "text-gray-500"
        }`}>
        Sign in
      </button>
      <button
        onClick={() => setActiveTab("create")}
        className={`px-6 py-2 rounded-xl font-medium ${
          activeTab === "create"
            ? "bg-white shadow font-semibold text-gray-900 text-sm"
            : "text-gray-500"
        }`}>
        Create account
      </button>
    </div>
  );
}
export default AuthTabs;
