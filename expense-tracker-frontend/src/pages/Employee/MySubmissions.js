import React, { useEffect, useState } from "react";
import { deleteMySubmissoin, fetchMySubmissions } from "../../service/mysubmissionsService";
import EditMySubmission from "./EditMySubmission";
import { fetchCategories } from "../../service/expenseService";

function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [remarksMap, setRemarksMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingSubmission ,setEditingSubmission] = useState({});

  useEffect(() => { 
    const fetchSubs = async () => {
      try {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        const userId = localStorage.getItem("userId");

        const res = await fetchMySubmissions(username, password, userId);
        const categories = await fetchCategories();

        //The submission (expense) object doesnt have category name but on categoryID so populating categorynames manually
        res.map(sub => {
          categories.map((category)=>{
            if(sub.categoryId == category.id)
              sub.categoryName = category.name;
          })
        });

        setSubmissions(res);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
      setLoading(false);
    };

    if(!isEditing || !isDeleting){
      fetchSubs();
    }

  },[isEditing,isDeleting]);

  const onClose = () =>{
    setIsEditing(false);
  }

  const handleDeleteExpense =(expense)=>{
    console.log("trying to delete " + expense.id);
    setIsDeleting(true);

    deleteMySubmissoin(expense)
                      .then((res)=> alert(res.message))
                      .then(()=>{setIsDeleting(false)})
                      .catch((e)=> alert("Could not delete that expense..."));
    }

  return (
    <div className="container mt-3">
      {isEditing && <EditMySubmission currentSubmission={editingSubmission} onClose={onClose}/>}


      <h2>My Expense Submissions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : submissions.length === 0 ? (
        <p>No submissions yet!</p>
      ) : (
        <table className="table table-striped">
           <thead className="table-dark">
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(sub => (
              <tr key={sub.id}>
                <td>{sub.description}</td>
                <td>{sub.categoryName}</td>
                <td>{sub.amount}</td>
                <td>{sub.date}</td>
                <td>{sub.status}</td>
                <td>{sub.remarks || "---"}</td>
                <td>
                  {sub.status === "PENDING" ? (
                    <>
                      <button className="btn btn-sm btn-secondary" onClick={()=>{setIsEditing(true); setEditingSubmission(sub)}}>Edit</button>
                      <button className="btn btn-sm btn-danger ms-2" onClick={()=>{handleDeleteExpense(sub)}}>Delete</button>
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
};

export default MySubmissions;