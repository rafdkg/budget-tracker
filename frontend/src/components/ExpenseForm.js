import { useState, useEffect, useMemo } from "react";
import { formatDate, groupByWeek } from '../utils/Utils.js';
import ExpenseList from './ExpenseList.js';
import axios from "axios";

function ExpenseForm({}) {

    const DEBUG_MODE = false;
    // Input Fields
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [expenseDate, setExpenseDate] = useState("");
    // data objects
    const [expenses, setExpenses] = useState([]);
    // const groupedExpenses = useMemo(() =>  groupByWeek(expenses), [expenses]);


    
    const fetchExpenses = () => {
        axios.get("http://127.0.0.1:5000/api/expenses")
            .then((response) => setExpenses(response.data))
            .catch((error) => console.error(error));

    };

    // Runs once on initial render to populate page with data.
    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !description) return;

        const dateField = 
            expenseDate === "" ? new Date() : new Date(expenseDate);
        
        const newExpense = {amount: parseFloat(amount), description, date: dateField.toISOString() };
        

        // console.log(newExpense.date);
        axios.post("http://127.0.0.1:5000/api/expenses", newExpense)
            .then(() => {
                fetchExpenses();
                setAmount("");
                setDescription(""); 
                setExpenseDate("");
            })
            .catch((error) => console.error(error));
    };
    
    const handleDelete = (id) => {
        // console.log("delete!", id);
        
        axios.delete(`http://127.0.0.1:5000/api/expenses/${id}`)
            .then(() => {
                const keepExpense = (expense) => expense.id !== id;
                setExpenses(expenses.filter(keepExpense));  //Re-render after deletion
            })
            .catch((error) => console.error(error));


    }

    // For Debugging purposes
    useEffect(() => {
        if (!DEBUG_MODE || expenses.length === 0) {
            return;
        }
        console.log("-----DEBUG-----");

    }, [expenses]);

    
    
    return (
        <div>
        
        <form onSubmit={handleSubmit} style={{display: "flex", gap: "10px"}}>
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input 
                type="date"
                placeholder="Date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
            />
            <button type="submit">Add Expense</button>
        </form>
        
        <ul>
            <ExpenseList expenses={expenses} onDeleteExpense={handleDelete} />
        </ul>
    </div>
    );
}

export default ExpenseForm;