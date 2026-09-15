import axios from "../../lib/axios";
export function getDoctors(params) {
  return axios.get("/doctors", { params }).then((res) => res.data);
}

export function getDoctor(id) {
  return axios.get(`/doctors/${id}`).then((res) => res.data);
}

export function createDoctor(payload) {
  return axios.post("/doctors", payload).then((res) => res.data);
}

export function updateDoctor(id, payload) {
  return axios.put(`/doctors/${id}`, payload).then((res) => res.data);
}

export function deleteDoctor(id) {
  return axios.delete(`/doctors/${id}`).then((res) => res.data);
}
