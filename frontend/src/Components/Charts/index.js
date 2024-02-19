

import { Component } from "react"; 
import Cookies from "js-cookie"; 
import axios from "axios";
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
   
    ResponsiveContainer,
    Bar,
  } from 'recharts'
import Header from "../Header";




class Charts extends Component{
    state={
        barChart:[] ,
        piechart:[],
        activeOption:"income"
    }


    componentDidMount(){
        this.getChartData() 
        
    }




    getChartData=async()=>{ 
        const userId=Cookies.get('userId') 
        const {activeOption}=this.state
        try{
            const response=await axios.get(`http://localhost:9000/api/barchart/?param1=${userId}&param2=${activeOption}`)     
            
            const response1=await axios.get(`http://localhost:9000/api/piechart/?param1=${userId}&param2=${activeOption}`) 
console.log(response.data) 
console.log(response1.data)
            this.setState({barChart:response.data,piechart:response1.data}) 
        
        }catch(e){
            console.log(e.response.data)
        }
    }


    renderPieChart=()=>{
        const {piechart}=this.state  
       
       
    
    
    
        console.log(piechart)
        return(
        
          <div className="chart-con">  
          <Header />
            <h1 className="Sales-item">Pie Chart</h1>
             <PieChart width={400} height={400}>
          
              <Pie
                dataKey="amount"
                isAnimationActive={false}
                data={piechart}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
              />
              
              <Tooltip />
            </PieChart>
      
          </div>
        )
      }

    renderBarChart=()=>{  

      
       
       const {barChart}=this.state 
       console.log(barChart)
    
        return(
         
       <div className="chart-con">
      
          <ResponsiveContainer width="50%" aspect={3}>
          <h1 className="Sales-item">Bar Chart</h1>
          <BarChart data={barChart} width={400} height={400}> 
          
          <XAxis dataKey="date" /> 
          <YAxis />
            <Bar dataKey="amount" fill="#5EFFF3"  />
          </BarChart>
         </ResponsiveContainer>
       </div>
    
        
             )
      }
    

      handleDropdownChange=e=>{
        this.setState({activeOption:e.target.value})
      }

    render(){

        const {activeOption}=this.state

        return(
            <div> 

<label htmlFor="data-filter">Select Option:</label>
      <select id="data-filter" value={activeOption} onChange={this.handleDropdownChange}>
        
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

           { this.renderBarChart()} 
           {this.renderPieChart()}
        </div>
        )
       
    }
}



export default Charts