import Landing from './components/Landing/Landing'
import Login from './components/Login/Login';
import Register from './components/Register/Register'

import './App.css'
import { Routes, Route } from "react-router-dom";

function App() {
 

  return (
    <>
     <Routes>
      <Route path="/prueba" element={<Register/>}></Route>
      <Route path='/' element={<Landing></Landing>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register/>}></Route>
     </Routes>
    </>
  )
}

export default App
