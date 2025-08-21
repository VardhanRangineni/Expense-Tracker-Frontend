const baseURL = "http://localhost:8080";

export const fetchMySubmissions = async (username, password, userId) => {
  const response = await fetch(`${baseURL}/api/expenses/employee/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": "Basic " + btoa(`${username}:${password}`),
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error('Could not fetch your expense submissions');
  }
  return await response.json();
};
