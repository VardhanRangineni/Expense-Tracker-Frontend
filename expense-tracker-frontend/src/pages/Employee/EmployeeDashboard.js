import React, { useEffect, useState } from "react";
import { fetchCategorySpendByMonth } from "../../service/employeedashboardService"

const EmployeeDashboard = () => {
    const [categorySpend, setCategorySpend] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const today = new Date();
    const monthAndYear = today.toLocaleString('default', { month: 'long' , year:'numeric'});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchCategorySpendByMonth();
                setCategorySpend(data);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

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
                            <h5>Category-wise Spend for {monthAndYear}</h5>
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
                                            categorySpend.map((category, idx) => (
                                                <tr key={idx}>
                                                    <td>{category.name}</td>
                                                    <td>₹{category.totalExpense}</td>
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
