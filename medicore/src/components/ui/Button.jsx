function Button({ variant = "primary", className = "", children, ...props }) {
  const variants = {
    primary: "bg-blue-900 text-white hover:bg-blue-800",
    secondary: "bg-gray-100 text-blue-900 hover:bg-gray-200",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  };

  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
