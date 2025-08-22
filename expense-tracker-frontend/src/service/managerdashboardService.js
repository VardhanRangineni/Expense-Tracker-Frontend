const baseURL ="http://localhost:8080";

export const getEmployeeCount = async (managerId) => {
    try {
        const response = await fetch(`${baseURL}/api/manager/${managerId}/employeeCount`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch employee count");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getApprovedAmounts = async (managerId) => {
    try {
        const response = await fetch(`${baseURL}/api/manager/${managerId}/approvedAmounts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch approved amounts");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};