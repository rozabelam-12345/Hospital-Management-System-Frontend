import SymptomCheck from "./chechk-symptoms";
import Describe from "./describe-symptoms";
import Pain from "./Pain-data";

function SymptomsForm() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 w-2/3 mb-2 ">
      <div className="flex flex-col">
        <p className="text-l font-semibold  text-gray-800">
          Tell us what you're feeling
        </p>
        <p className="text-sm  text-gray-500 ">
          Pick all that apply and add details below.
        </p>
      </div>
      <SymptomCheck />
      <Describe />
      <Pain />
    </div>
  );
}
export default SymptomsForm;
