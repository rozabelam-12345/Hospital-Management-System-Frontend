import Alert from "../../assets/alert-circle.png";

function AiHelp() {
  return (
    <div className="bg-blue-50 rounded-xl  border border-gray-200 w-1/3 ">
      <div>
        <div>
          <div className="flex flex-row items-center mt-4 p-2 gap-1">
            <img src={Alert} className="h-4 w-4" />
            <p className="font-semibold text-blue-950 text-base">
              How AI helps you
            </p>
          </div>
          <p className="p-2 text-blue-950 text-sm">
            Based on your selected symptoms and description, our model will
            classify the urgency level and suggest the most appropriate
            department and doctor.
          </p>
        </div>
        <div className="border-t border-blue-200" />

        <div className="p-2 mt-6 ">
          <p className="text-blue-950 text-base font-semibold">
            What we look at:
          </p>
          <p className="text-blue-950 text-sm"> ✓ Symptom combinations</p>
          <p className="text-blue-950 text-sm"> ✓ Your medical history</p>
          <p className="text-blue-950 text-sm"> ✓ Severity and duration</p>
          <p className="text-blue-950 text-sm">
            ✓ Risk factors (age, conditions)
          </p>
        </div>

        <div className="border rounded-sm p-2 mt-3 border-red-900 bg-red-50">
          <p className="text-red-900 text-base font-light">
            If this is a medical emergency, please call 112 immediately.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AiHelp;
