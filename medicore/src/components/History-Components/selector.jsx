import { useState } from "react";

function Selector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All statuses");

  return (
    <div className="relative w-40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border border-black rounded-lg px-3 py-2 text-sm text-gray-600 bg-white">
        {selected}
      </button>

      {open && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-black rounded-lg">
          <li
            onClick={() => {
              setSelected("All statuses");
              setOpen(false);
            }}
            className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100">
            All statuses
          </li>
          <li
            onClick={() => {
              setSelected("Completed");
              setOpen(false);
            }}
            className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100">
            Completed
          </li>
          <li
            onClick={() => {
              setSelected("Cancelled");
              setOpen(false);
            }}
            className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100">
            Cancelled
          </li>
        </ul>
      )}
    </div>
  );
}

export default Selector;
