
/*
import React, { useEffect } from 'react'
import { useState } from 'react'   
import Cookies from 'js-cookie' 

import axios from 'axios'
import './index.css'


const Dashboard = () => {

    const [selectedOption, setSelectedOption] = useState('all');
    const [data, setData] = useState([]);





      let type

      if (selectedOption==="all"){
        type="all"
      }else if (selectedOption==="income"){
        type="income" 
        
      }else if (selectedOption==="expense"){
        type="expense"
      }
const userId=Cookies.get('userId')

const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/getExpense/?param1=${userId}&param2=${type}`);

      console.log(response)

     
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  console.log(type)


  return (
    <div>
      <label htmlFor="data-filter">Select Option:</label>
      <select id="data-filter" value={selectedOption} onChange={handleDropdownChange}>
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

     

      <div>
      <h2>Expense List</h2>
      {data.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {data.map((expense) => {
           
           
           
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
         
          </li>
           )
           
           
           
         
           })}
        </ul>
      )}
    </div> 


    
    </div>
  );
}

export default Dashboard  


*/ 



import { Component } from "react";


import axios from "axios";

import Cookies from "js-cookie";
import Header from "../Header";



class Dashboard extends Component{

  state={
    activeOption:"all" ,
    data:[],
    barChart:[]

  }

  


  componentDidMount(){
    this.fetchData()
  }


  


  fetchData = async () => {

    const {activeOption}=this.state


    try {

     

     
      const userId=Cookies.get('userId')
      const response = await axios.get(`http://localhost:9000/api/getExpense/?param1=${userId}&param2=${activeOption}`);

      console.log(response.data)


      

  
     
     this.setState({data:response.data})
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  handleDropdownChange=e=>{
    this.setState({activeOption:e.target.value},this.fetchData) 
  
  } 





  

  render(){
    const {activeOption,data}=this.state  
    console.log(activeOption)
    console.log(data)
   

    return(

      <div> 
        <Header/>
      <label htmlFor="data-filter">Select Option:</label>
      <select id="data-filter" value={activeOption} onChange={this.handleDropdownChange}>
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

     

      <div>
      <h2>Expense List</h2>
      {data.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {data.map((expense) => {
           
           
           
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
         
          </li>
           )
           
           
           
         
           })}
        </ul>
      )}
    </div> 

    <div>

    {this.renderBarChart} 
    </div>



    
    </div>
    )
  }

}



export default Dashboard