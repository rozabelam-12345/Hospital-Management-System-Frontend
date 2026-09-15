import Robot from "../../assets/robot.png";

function AiRobot() {
  return (
    <div
      className="rounded-xl px-6 py-4 w-full mt-4"
      style={{ background: "linear-gradient(to right, #1e3a5f, #0d7a6e)" }}>
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={Robot} className="w-10 h-10 bg-white rounded-sm  " />
          <div>
            <p className="text-white font-medium text-base">
              Not feeling well?
            </p>
            <p className="text-white font-light text-sm">
              Describe your symptoms and our AI assistant will recommend the
              right specialist and the urgency of your case.
            </p>
          </div>
        </div>

        <button className=" border-gray-200 rounded-md bg-white px-3 py-3 text-cyan-950 font-semibold  hover:bg-gray-300 text-sm">
          <span> Start AI Analysis</span>
        </button>
      </div>
    </div>
  );
}

export default AiRobot;
