const API_URL = "http://127.0.0.1:8000/api";

export async function fetchEmployees() {
  const response = await fetch(`${API_URL}/employees/`);
  return response.json();
}
