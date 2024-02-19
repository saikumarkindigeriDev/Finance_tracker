// Register.js
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import  './index.css'

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [email,setEmail]=useState('') 
  const [confirmPassword,setConfirmPassword]=useState('')
 
  const [registrationResponse, setRegistrationResponse] = useState('');
 
  const Navigate=useNavigate()


  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:9000/register', {
        username,email,
        password,
      }); 
    
      const {message}=response.data
      setRegistrationResponse(response.data.message);
      console.log(message) 
      
      
    } catch (error) {

   
        setRegistrationResponse(error.response.data.error); 
        console.log(error.response.data.error) 
        
    }
  };

  const toLogin=()=>{
    Navigate("/login")
  }

  return (
    <form className='form-container' onSubmit={handleRegister}>
 <input
        type="text"
        placeholder="Username" value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
       <input
        type="text"
        placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
       <input
        type="text"
        placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> 
      <input
        type="password"
        placeholder="confirmPassword" value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type='submit'>Register</button> 
      <p onClick={toLogin}>Already Registered? Click here to login.</p> 

      {registrationResponse && <p>{registrationResponse}</p>}
    </form>
     
   
  );
};

export default RegisterForm;
