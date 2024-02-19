// ExpenseList.js
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const userId=Cookies.get('userId')
  console.log(userId)


  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/getExpenses/${userId}`); // You need to implement this endpoint in your server
      setExpenses(response.data); 
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching expenses:', error.response.data.error || error.message);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await axios.delete(`http://localhost:9000/api/deleteExpense/${expenseId}`);
      console.log(response.data.message);

      // After successful deletion, fetch updated expenses
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error.response.data.error || error.message);
    }
  };

  useEffect(() => {
    // Fetch expenses when the component mounts
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expense List</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => {
           
           
           
           let date = new Date(expense.date);
let simplifiedDate = date.toLocaleDateString();
           
           return(
  
            <li key={expense.id}>
            <div>
              <strong>Amount:</strong> ${expense.amount.toFixed(2)}
            </div>
            <div>
              <strong>Date:</strong> {simplifiedDate}
            </div>
            <div>
              <strong>Category:</strong> {expense.category}
            </div>
            <div>
              <strong>Type:</strong> {expense.type}
            </div>
            <div>
              <strong>Description:</strong> {expense.description}
            </div>
            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
          </li>
           )
           
           
           
         
           })}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
