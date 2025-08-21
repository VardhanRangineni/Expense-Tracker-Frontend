import React, { useEffect, useState } from "react";
import { fetchTeamSubmissions, updateExpenseStatus } from "../../service/viewsubmissionsService";

const ManagerSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [remarksMap, setRemarksMap] = useState({});
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const managerId = localStorage.getItem("userId");

  useEffect(() => {
    const loadSubmissions = async () => {
      setLoading(true);
      try {
        const data = await fetchTeamSubmissions(username, password, managerId, null);
        setSubmissions(data);
        const initRemarks = {};
        data.forEach(item => {
          initRemarks[item.id] = item.remarks || "";
        });
        setRemarksMap(initRemarks);
      } catch (err) {
        alert(err.message);
      }
      setLoading(false);
    };
    loadSubmissions();
  }, [username, password, managerId]);

  const handleRemarksChange = (expenseId, value) => {
    setRemarksMap(prev => ({ ...prev, [expenseId]: value }));
  };

  const handleUpdateStatus = async (expenseId, status) => {
    try {
      const expense = submissions.find(sub => sub.id === expenseId);
      if (!expense) {
        alert("Expense not found!");
        return;
      }
      const updatedExpense = {
        ...expense,
        remarks: remarksMap[expenseId] || "",
        managerId: parseInt(managerId),
      };
      await updateExpenseStatus(username, password, expenseId, status, updatedExpense);
      alert(`Expense ${status.toLowerCase()} successfully`);
      const data = await fetchTeamSubmissions(username, password, managerId, null);
      setSubmissions(data);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (submissions.length === 0) return <div>No submissions found.</div>;

  return (
    <div className="container mt-3">
      <h3>Team Expense Submissions</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Employee</th>
            <th>Add Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(sub => (
            <tr key={sub.id}>
              <td>{sub.description}</td>
              <td>{sub.categoryName || sub.categoryId}</td>
              <td>{sub.amount}</td>
              <td>{sub.date}</td>
              <td>{sub.status}</td>
              <td>{sub.employeeName || sub.employeeId}</td>
              <td>
                {sub.status === "PENDING" ? (
                  <input
                    type="text"
                    value={remarksMap[sub.id] || ""}
                    onChange={e => handleRemarksChange(sub.id, e.target.value)}
                    className="form-control"
                  />
                ) : (
                  sub.remarks || "No Remarks"
                )}
              </td>
              <td>
                {sub.status === "PENDING" ? (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(sub.id, "APPROVED")}
                      className="btn btn-success btn-sm me-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(sub.id, "REJECTED")}
                      className="btn btn-danger btn-sm"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerSubmissions;