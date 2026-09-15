import Button from "../../../components/ui/Button";

function PatientTable({ patients, onEdit, onDelete }) {
  console.log(patients);
  if (patients.length === 0) {
    return (
      <p className="text-sm text-gray-500 py-6 text-center">No patients yet.</p>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="grid grid-cols-4 py-2 px-4 border-b border-gray-200">
        <p className="text-xs text-blue-900 font-semibold">NAME</p>
        <p className="text-xs text-blue-900 font-semibold">EMAIL</p>
        <p className="text-xs text-blue-900 font-semibold">PHONE</p>
        <p className="text-xs text-blue-900 font-semibold">ACTIONS</p>
      </div>
      {patients.data.map((patient) => (
        <div
          key={patient.id}
          className="grid grid-cols-4 py-3 px-4 border-b border-gray-100 items-center">
          <p className="text-sm">{patient.fullName}</p>
          <p className="text-sm text-gray-500">{patient.email}</p>
          <p className="text-sm text-gray-500">{patient.phone || "—"}</p>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => onEdit(patient)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => onDelete(patient)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PatientTable;
