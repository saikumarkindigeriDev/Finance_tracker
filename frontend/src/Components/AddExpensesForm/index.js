
import React, { useState } from 'react'; 
import Cookies from 'js-cookie';
import axios from 'axios';
import ExpenseList from '../ExpenseList'; 
import Header from '../Header'

/*

const AddExpensesForm = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState(''); 



  const userId=Cookies.get('userId')

  const handleAddExpense = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/addExpense', {
        amount,
        date,
        category,
        type,
        description,
        userId,
      });

      console.log(response.data.message);

      // Clear the form fields if the expense is added successfully
      setAmount('');
      setDate('');
      setCategory('');
      setType('');
      setDescription('');
    } catch (e){
      console.log('Error adding expense:',e.response.data.error || e.message);

    }
  };

  return (
   
     <div> 
      <Header />


      <form>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </label>
        <br />
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <br />
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="" disabled>Select a category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <br />
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <button type="button" onClick={() => handleAddExpense({ amount, date, category, type, description })}>
          Add Expense
        </button>
      </form>
      <ExpenseList  />

    </div>
  );
};
*/

import { Component } from 'react';



let userId=Cookies.get('userId')

class AddExpensesForm extends Component{


  state={
    amount:'',
    date:"",
    category:"",
    type:'',
    description:"",
    expenseData:[],

  }

  
componentDidMount(){
  this.fetchExpenses()
}


fetchExpenses = async () => {
  try {
    const response = await axios.get(`http://localhost:9000/api/getExpenses/${userId}`);
     // You need to implement this endpoint in your server 
     
  this.setState({expenseData:response.data})
  console.log(response.data)
   
  } catch (error) {
    console.log('Error fetching expenses:', error);
  }
};


 
  changeAmount=e=>{
    this.setState({amount:e.target.value})
  }

  changeDate=e=>{
    this.setState({date:e.target.value})
  }

  changeCategory=e=>{
    this.setState({category:e.target.value})
  }

  changeOption=e=>{
    this.setState({type:e.target.value})
  }


  changeDescription=e=>{
    this.setState({description:e.target.value})
  }


  addExpense=async()=>{
    

    const {amount,date,category,type,description}=this.state 

    try {
      const response = await axios.post('http://localhost:9000/api/addExpense', {
        amount,
        date,
        category,
        type,
        description,
        userId,
      });

      console.log(response.data.message);  
      this.fetchExpenses()

    
  


  }catch(e){
    console.log(e)
  }


  }

  



  handleDeleteExpense = async (expenseId) => {
    try {
      const response = await axios.delete(`http://localhost:9000/api/deleteExpense/${expenseId}`);
      console.log(response.data.message);

   

const {expenseData}=this.state 

      const updatedExpenses=expenseData.filter(each=>each.id!==expenseId)
 this.setState({expenseData:updatedExpenses})
     
    } catch (error) {
      console.log('Error deleting expense:', error.response.data.error || error.message);
    }
  };

  render(){
    const {amount,date,category,type,description,expenseData}=this.state 

    return(
      <div> 
      <Header />


      <form>
        <label>
          Amount:
          <input type="number" value={amount} onChange={this.changeAmount} required />
        </label>
        <br />
        <label>
          Date:
          <input type="date" value={date} onChange={this.changeDate} required />
        </label>
        <br />
        <label>
          Category:
          <select value={category} onChange={this.changeCategory} required>
            <option value="" disabled>Select a category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <br />
        <label>
          Type:
          <select value={type} onChange={this.changeOption} required>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={this.changeDescription} required />
        </label>
        <br />
        <button type="button" onClick={this.addExpense}>
          Add Expense
        </button>
      </form>
     <>

<div>
      <h2>Expense List</h2>
      {expenseData.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {expenseData.map((expense) => {
           
           
           
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
           <button onClick={() => this.handleDeleteExpense(expense.id)}>Delete</button>
          </li>
           )
           
           
           
         
           })}
        </ul>
      )}
    </div>

     </>

    </div>

    )
  }
}


export default AddExpensesForm;

