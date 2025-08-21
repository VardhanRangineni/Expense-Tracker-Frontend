import { useState,useEffect } from "react";
import {addExpense, fetchCategories} from "../../service/expenseService";
import { getUser } from "../../service/loginService";

function EmployeeHome() {
    
    const [categories,setCategories] = useState([])
    const [dataCollected , setDataCollected] = useState(false);

    
    const [formData, setFormData] = useState({
        categoryId: '',
        amount: 0,
        description:'',
        managerId:0,
        employeeId:0
    });
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = localStorage.getItem("username");
                const password = localStorage.getItem("password");
                const res = await fetchCategories(username, password);
                setCategories(res);
            } catch (error) {
                alert(error);
            }
        };
        fetchData();
    }, []);

    useEffect(()=>{
        if(dataCollected){
            addExpense(formData)
                        .then(()=>alert("Expense Creation Succesful"))
                        .catch(e=>alert(e))
        }
        setFormData({
            categoryId: '',
            amount: 0,
            description:'',
            managerId:0,
            employeeId:0
        })
        setDataCollected(false);
    },[dataCollected])


    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }


    const handleSubmit= async (e)=>{
        e.preventDefault();
    
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        
    
        const userDetails = await getUser(username,password);
        
        console.log(userDetails.managerId,userDetails.id);
    
        setFormData(prev => ({
            ...prev,
            managerId: userDetails.managerId,
            employeeId : userDetails.id
        }));

        setDataCollected(true);
    }
    

    return (
    <div>
        
        <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="mb-3">Add a new Expense</h2>
            <div className="mb-3">
                <label htmlFor="categoryId" className="form-label">Select Category</label>
                    <select
                    id="categoryId"
                    name="categoryId"
                    onChange={handleChange}
                    value={formData.categoryId}
                    required
                    className="form-select"
                    >
                <option value="" >Choose a Category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                    {category.name} - {category.monthly_limit}
                    </option>
                ))}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Expense Amount</label>
                <input type="text" id="amount" name="amount" value={formData.amount} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
    
    </div>
    );
}

export default EmployeeHome;