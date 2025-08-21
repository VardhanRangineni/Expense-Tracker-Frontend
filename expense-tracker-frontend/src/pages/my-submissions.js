import React, { useEffect, useState } from "react";
import { fetchMySubmissions } from "../service/mysubmissionsService";

function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        const userId = localStorage.getItem("userId");
        const res = await fetchMySubmissions(username, password, userId);
        setSubmissions(res);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubs();
  }, []);

  return (
    <div>
      <h2>My Expense Submissions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : submissions.length === 0 ? (
        <p>No submissions yet!</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Manasu Marchukuna</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(sub => (
              <tr key={sub.id}>
                <td>{sub.description}</td>
                <td>{sub.categoryId}</td>
                <td>{sub.amount}</td>
                <td>{sub.date}</td>
                <td>{sub.status}</td>
                <td>{sub.remarks || "---"}</td>
                <td>
                  {sub.status === "PENDING" ? (
                    <>
                      <button className="btn btn-sm btn-secondary" disabled>Edit</button>
                      <button className="btn btn-sm btn-danger ms-2" disabled>Delete</button>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default MySubmissions;
