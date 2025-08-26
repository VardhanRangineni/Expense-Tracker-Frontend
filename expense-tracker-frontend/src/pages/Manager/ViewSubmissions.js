import React, { useEffect, useState } from "react";
import { fetchTeamSubmissions, updateExpenseStatus } from "../../service/viewsubmissionsService";

const ManagerSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [remarksMap, setRemarksMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentSubmissions , setCurrentSubmissions] = useState([]);
  const [statusFilter,setStatusFilter] = useState("");
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const managerId = localStorage.getItem("userId");

  useEffect(() => {
    const loadSubmissions = async () => {
      setLoading(true);
      try {
        const data = await fetchTeamSubmissions(username, password, managerId, null);
        setSubmissions(data);
        setCurrentSubmissions(data);
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


  useEffect(()=>{
    console.log("This has been triggered")
    
    if(statusFilter !== ""){
      setCurrentSubmissions(submissions.filter((sub)=>{
        return sub.status === statusFilter;
      }))
    }else{
      setCurrentSubmissions(submissions);
    }

  },[statusFilter])

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

  if (loading) return <div>Loading...</div>;
  

  return (
    <div className="container mt-3">
      <h3>Team Expense Submissions</h3>
      <div className="row mb-3">
        <div className="col-md-3">
              <select
                className="form-select"
                name="Status"
                value={statusFilter}
                onChange={(e)=>setStatusFilter(e.target.value)}
              >
                <option value="">Any Status</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
      </div>
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
            <th>Receipt</th>
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
              <td>
                    {sub.receiptUrl==="" || sub.receiptUrl===null?(
                      <span>No Reciept</span>
                    ):(
                      <a target="_blank" href={sub.receiptUrl}>Reciept</a>
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
