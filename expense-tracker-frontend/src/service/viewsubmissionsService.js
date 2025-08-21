const baseURL = "http://localhost:8080";

export const fetchTeamSubmissions = async (username, password, managerId, status) => {
  let url = `${baseURL}/api/manager/expenses/${managerId}`;
  if (status) {
    url += `?status=${encodeURIComponent(status)}`;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": "Basic " + btoa(`${username}:${password}`),
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Could not fetch team submissions");
  }
  return await response.json();
};

export const updateExpenseStatus = async (username, password, expenseId, status, expense) => {
  const response = await fetch(`${baseURL}/api/manager/expenses/${expenseId}/${status.toLowerCase()}`, {
    method: "PUT",
    headers: {
      "Authorization": "Basic " + btoa(`${username}:${password}`),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    throw new Error(`Failed to ${status.toLowerCase()} expense`);
  }
  return await response.json();
};