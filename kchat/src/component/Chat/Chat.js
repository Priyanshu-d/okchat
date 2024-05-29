import React, { useEffect,useContext, useState } from 'react'
import {user} from "../Join/Join.js"
import socketIO from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send.png"
import { userContext } from '../userContext';
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

const ENDPOINT="http://localhost:4500/"

let socket;

const Chat = () => {
  const [id, setId] = useState("")
  const [messages, setmessages] = useState([])

  const {user}= useContext(userContext);

 const send=()=>{

  const message=document.getElementById('chatInput').value;
  socket.emit('message',{message,id});
  document.getElementById('chatInput').value="";


 }
 //console.log(messages)
  
useEffect(() => {
     socket=socketIO(ENDPOINT,{transports:['websocket']});
  socket.on("connect",()=>{
    alert('connected');
    setId(socket.id);
  });
 
  //console.log(socket);
  socket.emit('joined',{user});
  socket.on('welcome',(data)=>{
    setmessages((prevmessages) => [...prevmessages, data]);
    console.log(data.user,data.message);


  })
  socket.on('user joined',(data)=>{
    setmessages((prevmessages) => [...prevmessages, data]);    console.log(data.user,data.message)
  });
socket.on('leave',(data)=>{
  setmessages((prevmessages) => [...prevmessages, data]);console.log(data.user,data.message);

});
 
    

return()=>{


 socket.disconnect();
  socket.off();
};
},[user]);

useEffect(() => {
  const handleMessage = (data) => {
    setmessages((prevmessages) => [...prevmessages, data]);

    console.log(data.user,data.message,data.id)
    //setmessages((prevmessages) => [...prevmessages, ]);

  };
  socket.on('sendMessage', handleMessage);


  return () => {
    socket.off('sendMessage', handleMessage);
  };
}, [messages]);




  return (
    < userContext.Provider value={{user}}>
    <div className="chatPage">
      <div className='chatContainer'> 
      <div className='header'>
        <h2>ok chat</h2>
        <a href="/"><img src={closeIcon} alt="close" /></a>
        
      </div>
      <ReactScrollToBottom className='chatBox'>
        {messages.map((item,i)=><Message user ={item.id===id?'':item.user}  message={item.message} classs={item.id===id?'right':'left'} />)

    }

      </ReactScrollToBottom>
    
      <div className='inputBox'>
        <input onKeyPress={(event)=>event.key==='Enter'? send():null} type="text" id ="chatInput"/>
        <button className='sendBtn' onClick={send}><img src={sendLogo} alt="send"/></button>

      </div>
      
      
      </div>
    
    </div>
    </userContext.Provider>
  )
}

export default Chat