import React, { useEffect, useState } from "react";
import { getEmployeeCount, getApprovedAmounts } from "../../service/managerdashboardService";

const ManagerDashboard = () => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [categoryData, setCategoryData] = useState([]);
    const [totalApproved, setTotalApproved] = useState(0);

    useEffect(() => {
        getEmployeeCount()
            .then(count => setEmployeeCount(count))
            .catch(() => setEmployeeCount(0));

        getApprovedAmounts()
            .then(data => {
                setCategoryData(data.categories);
                setTotalApproved(data.totalApproved);
            })
            .catch(() => {
                setCategoryData([]);
                setTotalApproved(0);
            });
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Manager Dashboard</h2>
            <div style={{ marginBottom: "2rem" }}>
                <h4>Total Employees Under You: {employeeCount}</h4>
            </div>
            <div>
                <h4>Approved Amounts by Category</h4>
                <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem" }}>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Approved Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryData.map((cat, idx) => (
                            <tr key={idx}>
                                <td>{cat.category}</td>
                                <td>{cat.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <strong>Total Approved Amount: {totalApproved}</strong>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;