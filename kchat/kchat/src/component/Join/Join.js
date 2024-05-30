import React, { useState,useContext } from 'react';
import "./Join.css";
import {Link} from "react-router-dom";
import { userContext } from '../userContext';



const Join = () => {

  const {setuser}=useContext(userContext);
    const [name, setname] = useState("");

    const sendUser=()=>{
      setuser(name);
      setname(""); ;

    };
  return (
   

    <div className='joinPage'>
        <div className='joinContainer'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIR75CBYQ6QAolO0DE83yoisPMedYFUxMZlowM6jdOdA&s" alt="logo" />
        <h1>okchat</h1>
        <input onChange={(e)=>setname(e.target.value)} placeholder='Enter Your Name' type="text"  id ="joinInput"/>
       <Link  onClick={(e)=>!name ? e.preventDefault():null}to ="/chat"> <button onClick={sendUser}className='joinBtn'>Log IN</button></Link>
        </div>

       </div>
     
  ) 
}

export default Join
