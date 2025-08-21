export const loginUser = async (username, password) => {
  const response = await fetch('http://localhost:8080/login', {
    method: "POST",
    headers: {
      "Authorization": "Basic " + btoa(`${username}:${password}`),
      "Content-Type": "application/json"
    }
  });
  console.log(response);
  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();
};


export const getUser = async (username,password) => {
  const response = await fetch('http://localhost:8080/getuser', {
    method: "GET",
    headers: {
      "Authorization": "Basic " + btoa(`${username}:${password}`),
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error('Could not fetch user!');
  }

  return await response.json();
};

