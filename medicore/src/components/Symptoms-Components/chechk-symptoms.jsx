function SymptomCheck() {
  return (
    <div>
      <p className="text-sm text-blue-900 font-semibold mt-2">
        Common symptoms
      </p>
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="flex items-center gap-1 border rounded-sm border-gray-400 p-1 ">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 text-blue-900 accent-blue-900 focus:ring-blue-900 "
          />
          <label for="small-checkbox" class="text-sm text-black select-none">
            Fever
          </label>
        </div>

        <div className="flex items-center gap-1 border rounded-sm border-gray-400 p-1 ">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 text-blue-900 accent-blue-900 focus:ring-blue-900  "
          />
          <label for="small-checkbox" class="text-sm text-black select-none">
            Sore throat
          </label>
        </div>
        <div className="flex items-center gap-1 border rounded-sm border-gray-400 p-1 ">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 text-blue-900 accent-blue-900 focus:ring-blue-900"
          />
          <label for="small-checkbox" class="text-sm text-black select-none">
            Fatigue
          </label>
        </div>
        <div className="flex items-center gap-1 border rounded-sm border-gray-400 p-1 ">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 text-blue-900 accent-blue-900 focus:ring-blue-900"
          />
          <label for="small-checkbox" class="text-sm text-black select-none">
            Abdominal pain
          </label>
        </div>
        <div className="flex items-center gap-1 border rounded-sm border-gray-400 p-1 ">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 text-blue-900 accent-blue-900 focus:ring-blue-900 "
          />
          <label for="small-checkbox" class="text-sm text-black select-none">
            Headache
          </label>
        </div>
        <div className="flex items-center gap-1 border rounded-sm border-gray-400 p-1 ">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 text-blue-900 accent-blue-900 focus:ring-blue-900"
          />
          <label for="small-checkbox" class="text-sm text-black select-none">
            Chest pain
          </label>
        </div>
        <div className="flex items-center gap-1 border rounded-sm border-gray-400 p-1 ">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 text-blue-900 accent-blue-900 focus:ring-blue-900 "
          />
          <label for="small-checkbox" class="text-sm text-black select-none">
            Nausea
          </label>
        </div>
        <div className="flex items-center gap-1 border rounded-sm border-gray-400 p-1 ">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 text-blue-900 accent-blue-900 focus:ring-blue-900"
          />
          <label for="small-checkbox" class="text-sm text-black select-none">
            Skin rash
          </label>
        </div>
        <div className="flex items-center gap-1 border rounded-sm border-gray-400 p-1 ">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 text-blue-900 accent-blue-900 focus:ring-blue-900"
          />
          <label for="small-checkbox" class="text-sm text-black select-none">
            Cough
          </label>
        </div>
        <div className="flex items-center gap-1 border rounded-sm border-gray-400 p-1 ">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 text-blue-900 accent-blue-900 focus:ring-blue-900"
          />
          <label for="small-checkbox" class="text-sm text-black select-none">
            Shortness of breath
          </label>
        </div>
        <div className="flex items-center gap-1 border rounded-sm border-gray-400 p-1 ">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 text-blue-900 accent-blue-900 focus:ring-blue-900"
          />
          <label for="small-checkbox" class="text-sm text-black select-none">
            Dizziness
          </label>
        </div>
        <div className="flex items-center gap-1 border rounded-sm p-1 border-gray-400 ">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm border-gray-300 text-blue-900 accent-blue-900 focus:ring-blue-900"
          />
          <label for="small-checkbox" class="text-sm text-black select-none">
            Joint pain
          </label>
        </div>
      </div>
    </div>
  );
}
export default SymptomCheck;
