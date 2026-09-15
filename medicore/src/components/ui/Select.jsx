function Select({ label, error, className = "", children, ...props }) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm text-blue-900">{label}</label>}
      <select
        className={`border rounded-xl px-4 py-2 bg-white text-sm text-black
          ${error ? "border-red-400" : "border-gray-300"} ${className}`}
        {...props}>
        {children}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default Select;
