// Existing frontend service — unchanged.
import apiClient from "./apiClient";

export async function getThreads() {
  const response = await apiClient.get("/api/threads");
  return response.data;
}
