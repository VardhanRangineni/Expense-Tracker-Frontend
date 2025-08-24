const baseURL = "http://localhost:8080";

export const fetchCategorySpendByMonth = async () => {
    

    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const employeeId = localStorage.getItem("userId");

    const response = await fetch(
        `${baseURL}/api/employee/get-expense-per-category/${employeeId}`,
        {
            method: "GET",
            headers: {
                Authorization: "Basic " + btoa(`${username}:${password}`),
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Could not fetch category spend by month");
    }

    return await response.json();
};
