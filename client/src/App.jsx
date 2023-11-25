import "./App.css";
import { useState} from "react";
import Cookies from 'universal-cookie';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CreateUser from "./components/CreateUser/CreateUser";
import Home from "./components/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import TopicsChat from "./components/Chats/TopicsChat/TopicsChat";
import Profile from "./components/Profile/Profile";
import {Cloudinary} from "@cloudinary/url-gen";
import Users from "./components/Home/Users/Users";


function App() {
  const cld = new Cloudinary({cloud: {cloudName: 'engpartnercloudinary'}})
  const cookies = new Cookies()
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))

  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/register" element={<Register setIsAuth={setIsAuth}/>} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/home" element={<Home setIsAuth={setIsAuth}/>} />
      <Route path="/createuser" element={<CreateUser />} />
      <Route path="*" element={<Navigate to="/home" />}/>
      <Route path='/topics' element={<TopicsChat/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path="connect" element={<Users/>}/>
    </Routes>
  );
}

export default App;
