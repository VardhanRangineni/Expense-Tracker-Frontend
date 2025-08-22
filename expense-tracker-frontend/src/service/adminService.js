const baseURL = "http://localhost:8080";

export const fetchAllManagers = async () => {
    
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    const response = await fetch(`${baseURL}/api/admin/get-managers`, {
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


export const addNewUser = async (user) =>{
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    
    const response = await fetch(baseURL+'/api/admin/add-user' , {
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(`${username}:${password}`),
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    });
    
    if(!response.ok){
        throw new Error('Could not Add a new expense');
    }

    return await response.json();
}
