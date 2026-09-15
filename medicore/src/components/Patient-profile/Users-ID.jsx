import Information from "./Personal-info";

function Userid() {
  return (
    <div className="">
      <div className="flex flex-col mb-6 ">
        <p className="text-2xl font-semibold  text-gray-800">My Profile</p>
      </div>
      <div className="flex flex-row gap-6 p-6">
        <div className="bg-white rounded-xl p-6 w-80 border border-gray-200 ">
          <div className="w-18 h-18 bg-blue-100 rounded-full flex items-center justify-center  ">
            <span className="text-blue-900 font-semibold text-2xl">AM</span>
          </div>
          <div className="flex flex-col justify-center items-center mt-6">
            <p className="font-semibold text-base">Anna Markovic</p>
            <p className="text-sm text-gray-500">Patient · North District</p>
          </div>
          <div className="bg-gray-100 border rounded-lg border-gray-100 mt-8 p-2">
            <p className="text-sm text-gray-500">Patient ID</p>
            <p className="text-xs">PAT-2024-08423</p>
          </div>
        </div>
        <Information />
      </div>
    </div>
  );
}
export default Userid;
