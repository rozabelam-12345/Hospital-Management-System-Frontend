import { useState } from "react";
import {
  usePatients,
  usePatientMutations,
} from "../../features/patients/hooks";
import { patientFields } from "../../features/patients/fields";
import PatientTable from "../../features/patients/components/PatientTable";
import Form from "../../components/ui/Form";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

function Patients() {
  const { patients, isLoading, error, refetch } = usePatients();
  const { save, remove, isSaving } = usePatientMutations({
    onSuccess: refetch,
  });

  const [editingPatient, setEditingPatient] = useState(null); // null = closed, {} = new, {...} = edit
  const isModalOpen = editingPatient !== null;

  async function handleSubmit(values) {
    await save(values);
    setEditingPatient(null);
  }
  async function handleDelete(patient) {
    if (confirm(`Delete ${patient.fullName}?`)) {
      await remove(patient.id);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold text-xl text-blue-950">Patients</p>
        <Button onClick={() => setEditingPatient({})}>+ Add patient</Button>
      </div>

      {isLoading && (
        <p className="text-sm text-gray-500">Loading patients...</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!isLoading && !error && (
        <PatientTable
          patients={patients}
          onEdit={setEditingPatient}
          onDelete={handleDelete}
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setEditingPatient(null)}
        title={editingPatient?.id ? "Edit patient" : "Add patient"}>
        <Form
          fields={patientFields}
          initialValues={editingPatient || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setEditingPatient(null)}
          isSaving={isSaving}
          submitLabel={editingPatient?.id ? "Save changes" : "Add patient"}
        />
      </Modal>
    </div>
  );
}

export default Patients;
