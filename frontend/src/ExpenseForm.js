import { useState, useEffect } from "react";
import axios from "axios";

function ExpenseForm({ onAddExpense }) {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/expenses")
            .then((response) => setExpenses(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !description) return;

        const newExpense = {amount: parseFloat(amount), description, date: new Date().toISOString() };

        axios.post("http://127.0.0.1:5000/api/expenses", newExpense)
            .then(() => {
                onAddExpense(newExpense);
                setAmount("");
                setDescription(""); 
            })
            .catch((error) => console.error(error));
 
        // onAddExpense({ amount: parseFloat(amount), description });
        // setAmount("");
        // setDescription(""); 
    };

    useEffect(() => {
        console.log(expenses);
        console.log("break");
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

            <button type="submit">Add Expense</button>
        </form>
        <ul>
            {expenses.map((expense, index) => (
                <li key={index}>
                ${expense.amount.toFixed(2)} - {expense.description} - {expense.date}
                </li>
                ))
            }
      </ul>
    </div>
    );
}

export default ExpenseForm;