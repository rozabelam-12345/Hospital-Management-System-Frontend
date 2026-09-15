import { useCallback, useEffect, useState } from "react";
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from "./api";

export function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load doctors.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    refetch();
  }, [refetch]);

  return { doctors, isLoading, error, refetch };
}

export function useDoctorMutations({ onSuccess } = {}) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  async function save(doctor) {
    setIsSaving(true);
    setError(null);
    try {
      const result = doctor.id
        ? await updateDoctor(doctor.id, doctor)
        : await createDoctor(doctor);
      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save doctor.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  }
  async function remove(id) {
    setIsSaving(true);
    setError(null);
    try {
      await deleteDoctor(id);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete doctor.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  }

  return { save, remove, isSaving, error };
}
