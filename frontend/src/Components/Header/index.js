import React from 'react' 
import { Link } from 'react-router-dom'
import './index.css'



 const Header = () => {
  return (
    <div className='header-container'>
       <ul>
      <Link to="/"><li>Home</li></Link>
        <Link to="/Dashboard"><li>Dashboard</li></Link> 
        <Link to="/charts"><li>Charts</li></Link>
       </ul>
    </div>
  )
}


export default Header