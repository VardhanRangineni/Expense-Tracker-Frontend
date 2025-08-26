import React, { useEffect, useState } from "react";
import { fetchTeamSubmissions, updateExpenseStatus } from "../../service/viewsubmissionsService";

const ManagerSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [remarksMap, setRemarksMap] = useState({});
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
  }, []);

  const handleRemarksChange = (expenseId, value) => {
    setRemarksMap(prev => ({ ...prev, [expenseId]: value }));
  };

  const handleUpdateStatus = async (sub, status) => {
    try {
      const expense = sub;
      if (!expense) {
        alert("Expense not found!");
        return;
      }
      let remark = remarksMap[expense.id] || "";
      if (status === "REJECT" && remark.trim() === "") {
        alert("You cannot REJECT the Submission With out a REMARK.");
        return;
      }
      if (status === "APPROVE" && remark.trim() === "") {
        remark = "NO REMARK";
      }
      const updatedExpense = {
        ...expense,
        remarks: remark,
        managerId: parseInt(managerId),
      };
      const res = await updateExpenseStatus(username, password, expense.id, status, updatedExpense);

      alert(res.message);
      
      fetchTeamSubmissions(username, password, managerId, null)
        .then((data) => setSubmissions(data))
        .catch((e) => console.log(e));
    } catch (err) {
      alert(err.message);
    }
  };

  const totalPages = Math.ceil(submissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubmissions = submissions.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  if (loading) return <div>Loading...</div>;
  if (submissions.length === 0) return <div>No submissions found.</div>;

  return (
    <div className="container mt-3">
      <h3>Team Expense Submissions</h3>
      <table className="table table-striped">
        <thead className="table-dark">
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
          {currentSubmissions?.map(sub => (
            <tr key={sub.id}>
              <td>{sub.description}</td>
              <td>{sub.categoryName || sub.categoryId}</td>
              <td>{sub.amount}</td>
              <td>{sub.date}</td>
              <td>
                <span className={`badge ${
                        sub.status === 'APPROVED' ? 'bg-success' :
                        sub.status === 'REJECTED' ? 'bg-danger' :
                        'bg-warning'
                      }`}>
                    {sub.status}
                  </span>
              </td>
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
                  sub.remarks
                )}
              </td>
              <td>
                {sub.status === "PENDING" ? (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(sub, "APPROVE")}
                      className="btn btn-success btn-sm me-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(sub, "REJECT")}
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

      {totalPages > 1 && (
        <nav aria-label="Submissions pagination">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            
            {getPageNumbers().map(pageNumber => (
              <li 
                key={pageNumber} 
                className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
              >
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
          
          <div className="text-center mt-2">
            <small className="text-muted">
              Showing {startIndex + 1} to {Math.min(endIndex, submissions.length)} of {submissions.length} submissions
            </small>
          </div>
        </nav>
      )}
    </div>
  );
};

export default ManagerSubmissions;
