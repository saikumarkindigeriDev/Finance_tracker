// App.js
import React from 'react';
import { BrowserRouter as Router, Route,Switch,  Routes, useNavigate } from 'react-router-dom';


import { AuthProvider } from './Context/AuthContext';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import Home from './Components/AddExpensesForm';
import Dashboard from './Components/Dashboard';
import Charts from './Components/Charts';





const App = () => {

  
  return (
    <AuthProvider>

<Router>
        <Routes>
          <Route exact path="/login"  element={<LoginForm/>} />
          <Route exact path="/register"  element={<RegisterForm/>} />
          <Route exact path="/"  element={<Home/>}/> 
          <Route exact path="/dashboard" element={<Dashboard/>} /> 
          <Route exact path="/charts" element={<Charts />} />
         
         
        </Routes>
      </Router>

    </AuthProvider>


      
   
  );
};



export default App;
