import { useState, useEffect, useMemo } from "react";
import { formatDate, groupByWeek } from './Utils.js';
import axios from "axios";

function ExpenseForm({}) {
    // Input Fields
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [expenseDate, setExpenseDate] = useState("");
    // data objects
    const [expenses, setExpenses] = useState([]);
    const groupedExpenses = useMemo(() =>  groupByWeek(expenses), [expenses]);


    
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
        

        console.log(newExpense.date);
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
        if (Object.keys(expenses).length === 0) {
            return;
        }
        console.log("-----DEBUG-----");
        // console.log(Object.entries(grouped));
        // console.log(Array.isArray(Object.entries(grouped)));

    }, [expenses]);

    
    
    return (
        <div>
        
        <form onSubmit={handleSubmit} style={{display: "flex", gap: "10px"}}>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
            {Object.entries(groupedExpenses).map(([week, expenses]) => (
                <li key={week}>
                    <h3> Week of {week}</h3>
                    <ul>
                        {expenses.map((expense) => (
                            <li key={expense.id} style={{display: "flex", gap: "10px"}}>
                                ${expense.amount.toFixed(2)} - {expense.description} - {formatDate(expense.date)}
                                <button onClick={() => handleDelete(expense.id)} >Delete</button>
                            </li>
                        ))}
                    </ul>
                </li>
                ))
            }
        </ul>

        {/* <h2>Old Code</h2>
        <ul>
            {expenses.map((expense) => (
                <li key={expense.id} style={{display: "flex", gap: "10px"}}>
                ${expense.amount.toFixed(2)} - {expense.description} - {formatDate(expense.date)}
                <button onClick={() => handleDelete(expense.id)} >Delete</button>
                </li>
                ))
            }
        </ul> */}
    </div>
    );
}

export default ExpenseForm;