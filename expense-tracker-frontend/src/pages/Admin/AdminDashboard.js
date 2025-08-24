import  { useState, useEffect } from 'react';
import { fetchAllManagers, fetchEmployees, fetchExpenses } from '../../service/adminService';


const AdminDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    employeeId: '',
    managerId: '',
    categoryId: '',
    month: new Date().getMonth() + 1
  });

  useEffect(() => {
    const loadManagers=async()=>{
            fetchAllManagers()
                    .then((res)=>setManagers(res))
                    .catch((err)=>console.log(err));
    }
    
    const loadEmployees=async()=>{
            fetchEmployees()
                    .then((res)=>setEmployees(res))
                    .catch((err)=>console.log(err));
    }

    // const loadCategories=async()=>{
    //         ()
    //                 .then((res)=>setEmployees(res))
    //                 .catch((err)=>console.log(err));
    // }
    
    loadExpenses(filters);
    loadEmployees();
    loadManagers();
    // fetchCategories();
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [filters]);

  const loadExpenses = async () => {
    fetchExpenses(filters)
              .then((res)=>setExpenses(res))
              .catch((err)=>console.log(err));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Expense Reports</h3>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3">
              <select 
                className="form-select"
                name="employeeId"
                value={filters.employeeId}
                onChange={handleFilterChange}
              >
                <option value="">All Employees</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.username}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select 
                className="form-select"
                name="managerId"
                value={filters.managerId}
                onChange={handleFilterChange}
              >
                <option value="">All Managers</option>
                {managers.map(manager => (
                  <option key={manager.id} value={manager.id}>{manager.username}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select 
                className="form-select"
                name="categoryId"
                value={filters.categoryId}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select 
                className="form-select"
                name="month"
                value={filters.month}
                onChange={handleFilterChange}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Employee</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Manager</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.employeeName}</td>
                    <td>{expense.categoryName}</td>
                    <td>₹{expense.amount}</td>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${
                        expense.status === 'APPROVED' ? 'bg-success' :
                        expense.status === 'REJECTED' ? 'bg-danger' :
                        'bg-warning'
                      }`}>
                        {expense.status}
                      </span>
                    </td>
                    <td>{expense.description}</td>
                    <td>{managers.find(m => m.id === expense.managerId)?.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
