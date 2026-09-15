import Calendar from "../../assets/calendar-check.png";
import Clock from "../../assets/clock.png";
import ClipboardIcon from "../../assets/clipboard-list.png";
import AiRobot from "./AI-History";

function History() {
  return (
    <div>
      <div className="flex flex-col mb-6 ">
        <p className="text-2xl font-semibold  text-blue-950">
          Welcome back, Anna
        </p>
        <p className="text-sm  text-blue-900 ">
          Here's your health overview for today.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="border border-gray-200 rounded-xl px-3 py-2 h-30 w-full bg-white">
          <div className="flex items-center gap-1">
            <img
              src={Calendar}
              className="w-4 h-4  border-gray-200 rounded-sm"
            />
            <p className="text-sm text-gray-600"> Total visits</p>
          </div>

          <p className="text-2xl font-medium mt-2">12</p>
        </div>

        <div className="border border-gray-200 rounded-xl px-3 py-2 h-30 w-full bg-white ">
          <div className="flex items-center gap-1">
            <img src={Clock} className="w-4 h-4  border-gray-200 rounded-sm " />
            <p className="text-sm  text-gray-600 ">Last appointment</p>
          </div>

          <p className="text-2xl font-medium mt-2"> 14 Apr 2026</p>
        </div>

        <div className="border border-gray-200 rounded-xl px-3 py-2 h-30 w-full bg-white ">
          <div className="flex items-center gap-1">
            <img
              src={ClipboardIcon}
              className="w-4 h-4  border-gray-200 rounded-sm "
            />
            <p className="text-sm  text-gray-600"> Medical records</p>
          </div>

          <p className="text-2xl font-medium mt-2">8</p>
        </div>
      </div>

      <AiRobot />
    </div>
  );
}
export default History;
