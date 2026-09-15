function Appointments() {
  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-base text-blue-950">
            Recent appointments
          </p>
        </div>

        <div className="grid grid-cols-4 py-2 border-b border-gray-200">
          <p className="text-xs text-blue-900 font-semibold">DATE</p>
          <p className="text-xs text-blue-900 font-semibold">DOCTOR</p>
          <p className="text-xs text-blue-900 font-semibold">DEPARTMENT</p>
          <p className="text-xs text-blue-900 font-semibold">STATUS</p>
        </div>

        <div className="grid grid-cols-4 py-4 border-b border-gray-100 items-center">
          <p className="text-sm">14 Apr 2026</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100  rounded-full flex items-center justify-center">
              <span className="text-blue-900 text-xs font-semibold">EP</span>
            </div>
            <p className="text-sm">Dr. Elena Petrova</p>
          </div>
          <p className="text-sm text-gray-500">Family Medicine</p>
          <div className="flex items-center gap-1 bg-green-50 text-green-600 rounded-full px-3 py-1 w-fit">
            <span className="text-xs">✓ Completed</span>
          </div>
        </div>

        <div className="grid grid-cols-4 py-4 border-b border-gray-100 items-center">
          <p className="text-sm">02 Mar 2026</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100  rounded-full flex items-center justify-center">
              <span className="text-blue-900 text-xs font-semibold">MI</span>
            </div>
            <p className="text-sm">Dr. Marko Iliev</p>
          </div>
          <p className="text-sm text-gray-500">Cardiology</p>
          <div className="flex items-center gap-1 bg-green-50 text-green-600 rounded-full px-3 py-1 w-fit ">
            <span className="text-xs">✓ Completed</span>
          </div>
        </div>

        <div className="grid grid-cols-4 py-4 items-center">
          <p className="text-sm">20 Jan 2026</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100  rounded-full flex items-center justify-center">
              <span className="text-blue-900 text-xs font-semibold">EP</span>
            </div>
            <p className="text-sm">Dr. Elena Petrova</p>
          </div>
          <p className="text-sm text-gray-500">Family Medicine</p>
          <div className="flex items-center gap-1 bg-red-100 text-red-600 rounded-full px-3 py-1 w-fit">
            <span className="text-xs"> X Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Appointments;
