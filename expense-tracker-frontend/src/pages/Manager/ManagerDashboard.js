import React, { useEffect, useState } from "react";
import {
  fetchApprovedAmounts,
  fetchEmployeeList,
  fetchCategoryWiseApproved,
} from "../../service/managerdashboardService";

const ManagerDashboard = () => {
  const [totalApprovedAmount, setTotalApprovedAmount] = useState(0);
  const [employeeData, setEmployeeData] = useState({
    employees: [],
    totalCount: 0,
  });
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const managerId = localStorage.getItem("userId");

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [approvedAmounts, employeeList, categoryApproved] =
          await Promise.all([
            fetchApprovedAmounts(username, password, managerId),
            fetchEmployeeList(username, password, managerId),
            fetchCategoryWiseApproved(username, password, managerId),
          ]);

        const totalAmount = approvedAmounts.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );
        setTotalApprovedAmount(totalAmount);

        setEmployeeData(employeeList);

        setCategoryData(categoryApproved);
      } catch (err) {
        alert(err.message);
      }
      setLoading(false);
    };

    loadDashboardData();
  }, [username, password, managerId]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-12">
          <h2>Manager Dashboard</h2>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="text-black">
            <div className="card-body text-center">
              <h4>Total Amount Approved by You</h4>
              <h2>₹{totalApprovedAmount.toLocaleString()}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Total Employees Under Manager: {employeeData.totalCount}</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Employee Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.employees.map((employeeName, index) => (
                      <tr key={index}>
                        <td>{employeeName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Amount Approved Per Category</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Category Name</th>
                      <th>Approved Amount</th>
                      <th>Remaining Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.map((category, index) => (
                      <tr key={index}>
                        <td>{category.categoryName}</td>
                        <td>₹{category.approvedAmount.toLocaleString()}</td>
                        <td
                          className={
                            category.remainingAmount
                          }
                        >
                          ₹{category.remainingAmount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
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

export default ManagerDashboard;
