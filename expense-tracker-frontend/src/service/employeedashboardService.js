const baseURL = "http://localhost:8080";

export const fetchCategorySpendByMonth = async (username, password, employeeId, month, year) => {
    const response = await fetch(
        `${baseURL}/api/employee/category-spend?employeeId=${employeeId}&month=${month}&year=${year}`,
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
