import Map from "../../assets/map-pin.png";
import Phone from "../../assets/phone.png";
import Mail from "../../assets/mail.png";
import Clock from "../../assets/clock.png";
import Stethoscop from "../../assets/stethoscope.png";
import ProfileCard from "./ProfileCard";

function Profile() {
  return (
    <div className="flex flex-row mt-6 gap-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200 flex-1">
        <div className="flex justify-between items-center mb-4 ">
          <div>
            <p className="text-base font-semibold">Your family doctor</p>
            <p className="text-sm text-gray-500">
              Assigned to your residential area
            </p>
          </div>
          <div className="flex flex-row justify-end  border border-gray-200 rounded-full px-3 py-2 w-fit gap-1  hover:bg-sky-100 cursor-auto">
            <img src={Map} className="w-5 h-5" />
            <p className="text-sm">North District</p>
          </div>
        </div>

        <div className="border-t border-gray-200" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 mt-4">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center ">
              <span className="text-blue-900 font-semibold text-xl">EM</span>
            </div>
            <div>
              <p className="font-semibold">Dr. Elena Petrova</p>
              <p className="text-sm text-gray-500">Family Medicine</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-2 mt-2 border border-gray-200 rounded-full px-3 py-2 w-fit bg-gray-200 hover:bg-gray-300 cursor-auto">
              <img src={Phone} className="w-4 h-4" />
              <p className="text-sm">+389 2 311 4520 </p>
            </div>

            <div className="flex items-center gap-2 mt-2 border border-gray-200 rounded-full px-3 py-2 w-fit  bg-gray-200 hover:bg-gray-300 cursor-auto">
              <img src={Mail} className="w-4 h-4" />
              <p className="text-sm">e.petrova@medicore.health</p>
            </div>
          </div>
        </div>
      </div>

      <ProfileCard />
    </div>
  );
}
export default Profile;
