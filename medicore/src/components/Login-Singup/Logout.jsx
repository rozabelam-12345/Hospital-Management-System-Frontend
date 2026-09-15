function Logout() {
  return (
    <div
      className="h-full "
      style={{ background: "linear-gradient(to right, #1e3a5f, #0d7a6e)" }}>
      <div className=" flex flex-col justify-between pl-10 h-full">
        <div className="flex items-center gap-3 mt-12 ">
          <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center">
            <span className="text-blue-900 font-bold text-lg">M</span>
          </div>
          <p className="text-base font-bold text-white">MediCore</p>
        </div>
        <div className="flex flex-col justify-end pb-16 ">
          <div>
            <p className="text-white font-bold text-4xl ">
              Your health, intelligently <br />
              coordinated.
            </p>
            <p className="text-white text-sm mt-5">
              AI-assisted triage, family-doctor continuity, and a single
              <br />
              place for your medical history.
            </p>
          </div>
          <div className="flex flex-row gap-5 mt-10 text-white ">
            <div className="flex flex-col">
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs">Specialists</p>
            </div>
            <div className="flex-flex-col">
              <p className="text-2xl font-bold">1,400+</p>
              <p className="text-xs">Patients</p>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-bold">92%</p>
              <p className="text-xs">AI accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Logout;
