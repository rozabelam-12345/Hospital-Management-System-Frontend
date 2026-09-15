import Clock from "../../assets/clock.png";
import Stethoscop from "../../assets/stethoscope.png";
import Map from "../../assets/map-pin.png";

function ProfileCard() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 flex-1">
      <div className="flex justify-between items-center mb-1">
        <p className="font-semibold text-base">Upcoming appointment</p>
        <div className="flex flex-row justify-end border border-gray-200 rounded-full px-3 py-2 w-fit mb-1 hover:bg-green-100 gap-1">
          <p className="text-sm"> Confirmed</p>
          <img src={Clock} className="w-5 h-5" />
        </div>
      </div>

      <div className="border-t border-gray-200" />

      <div className="flex flex-col mb-1">
        <p className="font-semibold text-lg">Wed, 28 May 2026</p>
        <p className="text-xl text-blue-900 font-semibold">10:30</p>
      </div>

      <div className="border-t border-gray-200" />

      <div className="flex flex-col gap-2 mt-2">
        <div className="flex flex-row">
          <img src={Stethoscop} className="w-5 h-5" />
          <p className="text-sm ">Dr. Elena Petrova · Family Medicine</p>
        </div>
        <div className="flex flex-row">
          <img src={Map} className="w-5 h-5 " />
          <p className="text-sm"> Clinic A · Room 204</p>
        </div>
      </div>

      <div className="flex flex-row ">
        <button className="border border-blue-900 rounded-xl p-1 m-2 text-blue-900 text-sm hover:bg-blue-100">
          <span>Reschedule</span>
        </button>

        <button className="border border-red-900 rounded-xl p-1 m-2 text-sm text-red-900 hover:bg-red-100 ">
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
}
export default ProfileCard;
