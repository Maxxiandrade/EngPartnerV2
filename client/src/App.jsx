import Landing from './components/Landing/Landing'
import Login from './components/Login/Login';
import Register from './components/Register/Register'
import CreateUser from './components/createUser/createUser';
import './App.css'
import { Routes, Route } from "react-router-dom";

function App() {
 

  return (
    <>
     <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/createuser' element={<CreateUser/>}/>
     </Routes>
    </>
  )
}

export default App
