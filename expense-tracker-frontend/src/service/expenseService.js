const baseURL = "http://localhost:8080"

export const fetchCategories = async () =>{
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const response = await fetch(baseURL+'/api/expenses/categories' , {
        method: "GET",
        headers: {
        "Authorization": "Basic " + btoa(`${username}:${password}`),
        "Content-Type": "application/json"
        }
    });
    
    if(!response.ok){
        throw new Error('Could not fetch categories');
    }
    return await response.json();
}

export const addExpense = async (formData) =>{
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    
    const response = await fetch(baseURL+'/api/expenses/addexpense' , {
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(`${username}:${password}`),
            "Content-Type": "application/json"
        },
        body:JSON.stringify(formData)
    });
    
    if(!response.ok){
        throw new Error('Could not Add a new expense');
    }

    return response;
}
