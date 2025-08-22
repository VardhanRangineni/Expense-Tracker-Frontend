import React, { useEffect, useState } from "react";
import { fetchCategorySpendByMonth } from "../../service/employeedashboardService"

const EmployeeDashboard = () => {
    const [categorySpend, setCategorySpend] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const employeeId = localStorage.getItem("userId");

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchCategorySpendByMonth(
                    username,
                    password,
                    employeeId,
                    month,
                    year
                );
                setCategorySpend(data);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        fetchData();
    }, [username, password, employeeId, month, year]);

    if (loading) return <div className="text-center mt-4">Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col-12">
                    <h2>Employee Dashboard</h2>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Category-wise Spend for {month}/{year}</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Category</th>
                                            <th>Amount Spent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categorySpend.length === 0 ? (
                                            <tr>
                                                <td colSpan="2" className="text-center">
                                                    No data available
                                                </td>
                                            </tr>
                                        ) : (
                                            categorySpend.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td>{item.category}</td>
                                                    <td>₹{item.amountSpent.toLocaleString()}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
