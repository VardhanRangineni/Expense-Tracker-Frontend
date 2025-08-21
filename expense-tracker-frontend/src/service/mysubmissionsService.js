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


export const updateMySubmission = async (updatedSubmission) =>{
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const response = await fetch(`${baseURL}/api/expenses/update-expense`,{
    method:"PUT",
    headers:{
       "Authorization": "Basic " + btoa(`${username}:${password}`),
        "Content-type":"application/json"  
    },
    body:JSON.stringify(updatedSubmission)
  });
  if(!response.ok){
    throw new Error('Could not update your expense');
  }
  return await response.json();
}