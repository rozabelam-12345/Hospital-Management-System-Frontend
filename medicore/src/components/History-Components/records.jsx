function Records() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
      <div>
        <p className="text-lg font-bold text-sky-900">Medical records</p>
      </div>
      <div className="border-t border-gray-200" />

      <div className="flex flex-col">
        <div className="flex flex-row mt-2 gap-2">
          <p className="text-base">Annual physical examination</p>
          <p className=" bg-sky-100 text-sky-900 rounded-full px-1 py-1 w-fit text-sm">
            Routine
          </p>
          <p className=" bg-sky-100 text-sky-900 rounded-full px-1 py-1 w-fit text-sm">
            Family Medicine
          </p>
        </div>

        <p className="text-sm text-gray-500">14 Apr 2026 · Dr. Elena Petrova</p>
        <div className="mt-2">
          <p className="text-gray-500 text-sm">
            Patient in good general health. Blood pressure 118/76, heart rate 72
            bpm. Recommended continuation of current vitamin D regimen and
            follow-up in 6 months.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      <div className="flex flex-col ">
        <div className="flex flex-row mt-2 gap-2">
          <p>Cardiology consultation</p>
          <p className=" bg-sky-100 text-sky-900 rounded-full px-1 py-1 w-fit text-sm">
            Cardiology
          </p>
        </div>

        <p className="text-sm text-gray-500">
          02 Mar 2026 · Dr. Rozabela Minaj
        </p>

        <div className="mt-2">
          <p className="text-gray-500 text-sm">
            Mild palpitations reported. ECG normal. No structural abnormalities
            found. Advised lifestyle adjustments and reduced caffeine intake.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      <div className="flex flex-col">
        <div className="flex flex-row mt-2 gap-2">
          <p>Dermatology follow-up</p>
          <p className=" bg-sky-100 text-sky-900 rounded-full px-1 py-1 w-fit text-sm">
            Dermatology
          </p>
        </div>

        <p className="text-sm text-gray-500">12 Sep 2025 · Dr. Xhei Baku</p>

        <div className="mt-2">
          <p className="text-gray-500 text-sm">
            Treatment of mild eczema continuing positively. Prescribed topical
            cream renewed for 3 months.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Records;
