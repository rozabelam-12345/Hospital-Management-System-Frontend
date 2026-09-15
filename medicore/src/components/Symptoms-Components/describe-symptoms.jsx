function Describe() {
  return (
    <div className="mt-4">
      <div className="text-sm text-blue-900 font-semibold">
        <p>Describe your symptoms in your own words</p>
      </div>
      <div>
        <input
          className="border border-gray-300 rounded-xl w-full px-10 py-10 text-sm text-black bg-white"
          type="text"
          placeholder=""
        />
      </div>
    </div>
  );
}
export default Describe;
