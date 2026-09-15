import { useState } from "react";

function RecentAppointments() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All statuses");

  const appointments = [
    {
      id: 1,
      date: "14 Apr 2026",
      doctor: "Dr. Elena Petrova",
      initials: "EP",
      department: "Family Medicine",
      status: "completed",
      urgency: "Non-urgent",
    },
    {
      id: 2,
      date: "02 Mar 2026",
      doctor: "Dr. Marko Iliev",
      initials: "MI",
      department: "Cardiology",
      status: "completed",
      urgency: "Semi-urgent",
    },
    {
      id: 3,
      date: "20 Jan 2026",
      doctor: "Dr. Elena Petrova",
      initials: "EP",
      department: "Family Medicine",
      status: "cancelled",
      urgency: "Non-urgent",
    },
    {
      id: 4,
      date: "4 Mar 2026",
      doctor: "Dr. Xhei Baku",
      initials: "XHB",
      department: "Dermatology",
      status: "completed",
      urgency: "Non-urgent",
    },
    {
      id: 5,
      date: "31 Mar 2026",
      doctor: "Dr. Rozabela Minaj",
      initials: "RM",
      department: "Cardiology",
      status: "completed",
      urgency: "Non-urgent",
    },
  ];

  const filtered = appointments.filter((a) => {
    if (selected === "All statuses") return true;
    if (selected === "Completed") return a.status === "completed";
    if (selected === "Cancelled") return a.status === "cancelled";
  });

  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-lg text-sky-900">
            Appointments History
          </p>

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
        </div>

        <div className="grid grid-cols-5 py-2 border-b border-gray-200">
          <p className="text-xs text-blue-900 font-semibold">DATE</p>
          <p className="text-xs text-blue-900 font-semibold">DOCTOR</p>
          <p className="text-xs text-blue-900 font-semibold">DEPARTMENT</p>
          <p className="text-xs text-blue-900 font-semibold">STATUS</p>
          <p className="text-xs text-blue-900 font-semibold">URGENCY</p>
        </div>

        {filtered.map((a) => (
          <div
            key={a.id}
            className="grid grid-cols-5 py-4 border-b border-gray-100 items-center">
            <p className="text-sm">{a.date}</p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-900 text-xs font-bold">
                  {a.initials}
                </span>
              </div>
              <p className="text-sm">{a.doctor}</p>
            </div>
            <p className="text-sm text-gray-500">{a.department}</p>
            {a.status === "completed" ? (
              <div className="flex items-center gap-1 bg-green-50 text-green-600 rounded-full px-3 py-1 w-fit">
                <span className="text-xs">✓ Completed</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-red-100 text-red-600 rounded-full px-3 py-1 w-fit">
                <span className="text-xs">X Cancelled</span>
              </div>
            )}
            {a.urgency === "Non-urgent" ? (
              <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 rounded-full px-3 py-1 w-fit">
                <span className="text-xs">Non-urgent</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-red-100 text-red-600 rounded-full px-6 py-1 w-fit">
                <span className="text-xs">Urgent</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentAppointments;
