import { useCallback, useEffect, useState } from "react";
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "./api";

export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load patients.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    refetch();
  }, [refetch]);

  return { patients, isLoading, error, refetch };
}

export function usePatientMutations({ onSuccess } = {}) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  async function save(patient) {
    setIsSaving(true);
    setError(null);
    try {
      const result = patient.id
        ? await updatePatient(patient.id, patient)
        : await createPatient(patient);
      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save patient.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  }
  async function remove(id) {
    setIsSaving(true);
    setError(null);
    try {
      await deletePatient(id);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete patient.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  }

  return { save, remove, isSaving, error };
}
