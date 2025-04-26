import { useMemo } from 'react';
import { formatDate, groupByWeek } from '../utils/Utils';

function ExpenseList({ expenses, onDeleteExpense }) {
    const groupedExpenses = useMemo(() =>  groupByWeek(expenses), [expenses]);


    return (
        <div>
            {Object.entries(groupedExpenses).map(([week, expenses]) => (
                <li key={week}>
                    <h3> Week of {week}</h3>
                    <ul>
                        {expenses.map((expense) => (
                            <li key={expense.id} style={{display: "flex", gap: "10px"}}>
                                ${expense.amount.toFixed(2)} - {expense.description} - {formatDate(expense.date)}
                                <button onClick={() => onDeleteExpense(expense.id)} >Delete</button>
                            </li>
                        ))}
                    </ul>
                </li>
                ))
            }
        </div>
    );
}

export default ExpenseList;