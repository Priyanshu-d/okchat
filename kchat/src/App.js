import './App.css';
import {BrowserRouter as Router,Route,Routes}from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from './component/Chat/Chat';
import { userContext } from './component/userContext';
import {useState} from 'react';
 


function App() {
  const [user, setuser] = useState("");

  return (
    
    <div className="App">
      <userContext.Provider value={{ user, setuser }}>
    <Router> 
      <Routes>
    <Route path="/" element={<Join />} />

      <Route path="/chat" element={<Chat />} />
      </Routes>
      </Router>
      </userContext.Provider>
    </div>
    
  );
}

export default App;
