// Login.js
import React, { useState } from 'react'; 
import Cookies from 'js-cookie';

import { AuthProvider,useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import  './index.css'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [loginStatus, setLoginStatus] = useState(null);
const Navigate=useNavigate()


  const handleLogin = async (e) => { 
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:9000/login', {
        username,
        password,
      });
      const { userId, token,message ,Status,usernamee} = response.data;  
     console.log(userId,token,message,Status,usernamee)
      setLoginStatus(message);
    
      login(userId,  token);  
      Cookies.set('token', token, { expires: 7 }); // expires in 7 days
      Cookies.set('userId', userId, { expires: 7 });
      Cookies.set('username', usernamee, { expires: 7 });
  

      if (response.data.Status==="Success"){
        Navigate("/")
      }
      console.log(userId,token)
    } catch (error) {
      console.log('Login failed:', error);
      setLoginStatus(error.error);
    }
  };


 const hangleRegister=()=>{
    Navigate("/register")
  }

  return (
    <form className='form-container' onSubmit={handleLogin}>
        
        <input
        type="text"
        placeholder="Usernamed"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit' onClick={handleLogin}>Login</button> 
      <button onClick={hangleRegister}>Register</button> 
     {loginStatus && <p>{loginStatus}</p>}
     </form>
  );
};

export default LoginForm;
