// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({  children}) => {
 
  const [userId,setUserId]=useState('null') 
  const [token,setToken]=useState('null') 


  const login = (user_id, jwt_token) => {
    setToken(jwt_token) 
    setUserId(user_id)
  };

  const values={
    userId,setToken,setUserId,token
  }


  return (
    <AuthContext.Provider value={{values,login}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
