import  { useState, useEffect } from 'react';
import { fetchAllManagers, fetchEmployees, fetchExpenses, fetchTotalExpense, fetchTotalExpensePerCategory } from '../../service/adminService';
import { fetchCategories } from '../../service/expenseService';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";

const AdminDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalExpense,setTotalExpense] = useState(0);
  const [isLoading,setIsLoading] = useState(true);
  const [expensePercategory,setExpenseForCategory] = useState([]);

  const [filters, setFilters] = useState({
    employeeId: '',
    managerId: '',
    categoryId: '',
    month: new Date().getMonth() + 1
  });

  const today = new Date();
  const monthAndYear = today.toLocaleString('default', { month: 'long' , year:'numeric'});


  useEffect(() => {
    const loadData = async()=>{
      try{
        const managersData = await fetchAllManagers();
        setManagers(managersData);

        const employeesData = await fetchEmployees(); 
        setEmployees(employeesData);

        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        const totalExpenseData = await fetchTotalExpense();
        setTotalExpense(totalExpenseData.totalExpense); 

        const expensePerCategoryData= await fetchTotalExpensePerCategory();
        setExpenseForCategory(expensePerCategoryData);
      }catch(e){
        alert(e);
      }finally{
        setIsLoading(false);
      }
    }
    loadData();
    loadExpenses(filters);
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

  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
      
      const categoryLabels = categories.map((category) => category.name);
      const approvedAmounts = expensePercategory.map((category) => category.totalExpense);
  
      const barData = {
      labels: categoryLabels,
      datasets: [
        {
          label: 'Approved Amount',
          data: approvedAmounts,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(2, 154, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const barOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `₹${context.parsed.y.toLocaleString()}`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `₹${value.toLocaleString()}`,
          },
        },
      },
    };
  

  if(isLoading) return (<div>loading...</div>)

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

      <div className='card mb-4'>
        <div className='card-body'>
          <h2>Total EXPENSE for  {monthAndYear}:  <span > ₹{totalExpense} </span></h2>
        </div>
      </div>
      
      <div className="row" >
          <div className="col-12">
            <div className="card mb-4 ">
                <div className="card-header">
                  <h5>Amount Approved Per Category</h5>
                </div>
                <div className="card-body">
                  <Bar data={barData} options={barOptions} />
                </div>
            </div>
          </div>
      </div>

      

    </div>
  );
};

export default AdminDashboard;
