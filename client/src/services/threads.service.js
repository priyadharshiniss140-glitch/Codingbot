// Existing frontend service — unchanged; its four methods target the same REST routes.
import apiClient from "./apiClient";

export async function getThreads() {
  const res = await apiClient.get("/api/threads");
  return res.data;
}
export async function createThread(data) {
  const res = await apiClient.post("/api/threads", data);
  return res.data;
}
export async function updateThread(id, data) {
  const res = await apiClient.put("/api/threads/" + id, data);
  return res.data;
}
export async function deleteThread(id) {
  const res = await apiClient.delete("/api/threads/" + id);
  return res.data;
}
