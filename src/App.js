import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

function App() {

  return (
    <div>
      <h1>Budget Tracker</h1>
      <ExpenseForm />
      {/* <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            ${expense.amount.toFixed(2)} - {expense.description}
          </li>
        ))}
      </ul> */}
    </div>

  );
}

export default App;
