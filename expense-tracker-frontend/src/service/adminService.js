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
        throw new Error('Could not fetch managers');
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


export const fetchExpenses = async (filters = {}) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    
    const { employeeId = 0, managerId = 0, categoryId = 0, month = 0 } = filters;
    
    const queryParams = new URLSearchParams({
        employeeId,
        managerId,
        categoryId,
        month
    }).toString();

    const response = await fetch(`${baseURL}/api/admin/expenses?${queryParams}`, {
        method: "GET",
        headers: {
            "Authorization": "Basic " + btoa(`${username}:${password}`),
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error('Could not fetch expenses');
    }
    return await response.json();
};




export const fetchEmployees = async (filters = {}) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    const response = await fetch(`${baseURL}/api/admin/employees?`, {
        method: "GET",
        headers: {
            "Authorization": "Basic " + btoa(`${username}:${password}`),
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error('Could not fetch employees');
    }
    return await response.json();
};