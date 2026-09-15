import axios from "../../lib/axios";
export function getPatients(params) {
  return axios.get("admin/patients", { params }).then((res) => res.data);
}

export function getPatient(id) {
  return axios.get(`admin/patients/${id}`).then((res) => res.data);
}

export function createPatient(payload) {
  return axios.post("admin/patients", payload).then((res) => res.data);
}

export function updatePatient(id, payload) {
  return axios.put(`admin/patients/${id}`, payload).then((res) => res.data);
}

export function deletePatient(id) {
  return axios.delete(`admin/patients/${id}`).then((res) => res.data);
}
