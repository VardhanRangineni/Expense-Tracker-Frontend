const baseURL = "http://localhost:8080";

export const fetchApprovedAmounts = async (username, password) => {
    const response = await fetch(`${baseURL}/api/manager/expenses/approvedAmounts`, {
        method: "GET",
        headers: {
            Authorization: "Basic " + btoa(`${username}:${password}`),
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Could not fetch approved amounts");
    }
    return await response.json();
};

export const fetchEmployeeList = async (username, password) => {
    const response = await fetch(`${baseURL}/api/manager/expenses/employeeList`, {
        method: "GET",
        headers: {
            Authorization: "Basic " + btoa(`${username}:${password}`),
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Could not fetch employee list");
    }
    return await response.json();
};

export const fetchCategoryWiseApproved = async (username, password) => {
    const response = await fetch(`${baseURL}/api/manager/expenses/categoryWiseApproved`, {
        method: "GET",
        headers: {
            Authorization: "Basic " + btoa(`${username}:${password}`),
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Could not fetch category wise approved amounts");
    }
    return await response.json();
};
