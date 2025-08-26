const baseURL = "http://localhost:8080";

export const fetchMySubmissions = async (username, password) => {
  const response = await fetch(`${baseURL}/api/employee/get-expenses`, {
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

  console.log("trying to update expense with data: " + JSON.stringify(updatedSubmission));
  const response = await fetch(`${baseURL}/api/employee/update-expense`,{
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


export const deleteMySubmissoin = async (expense) =>{
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const response = await fetch(`${baseURL}/api/employee/delete-expense/${expense.id}`,{
    method:"DELETE",
    headers:{
       "Authorization": "Basic " + btoa(`${username}:${password}`),
        "Content-type":"application/json" 
    },
  });
  if(!response.ok){
    throw new Error('Could not delete your expense');
  }

  return await response.json();
}