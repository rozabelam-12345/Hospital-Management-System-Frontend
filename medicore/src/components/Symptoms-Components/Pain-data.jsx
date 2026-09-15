function Pain() {
  return (
    <div>
      <div className="mt-4 flex flex-row gap-4">
        <div>
          <p className="text-sm text-blue-900 font-semibold">
            How long have you had these symptoms?
          </p>
          <select className="border border-blue-900 rounded-xl px-10 py-2 text-sm text-black bg-white mt-2">
            <option value="all">A few hours </option>
            <option value="completed">About a day</option>
            <option value="cancelled">2-3 days</option>
            <option value="cancelled">A weak or more</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <p className="text-sm text-blue-900 font-semibold">
            Pain level (1-10)
          </p>
          <input type="range" min="1" max="10" className="w-full" />
        </div>
      </div>
      <div className="mt-2 flex flex-row-reverse">
        <button className="border rounded-lg p-2 border-blue-900 text-blue-900 bg-white  hover:bg-blue-100">
          Run AI analysis →
        </button>
      </div>
    </div>
  );
}
export default Pain;
