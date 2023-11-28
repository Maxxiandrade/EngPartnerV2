import "./App.css";

//Components to render
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CreateUser from "./components/CreateUser/CreateUser";
import Home from "./components/Home/Home";
import TopicsChat from "./components/Chats/TopicsChat/TopicsChat";
import Profile from "./components/Profile/Profile";
import Users from "./components/Home/Users/Users";

//Tools
import { useState} from "react";
import Cookies from 'universal-cookie';
import { Routes, Route, Navigate } from "react-router-dom";
import {Cloudinary} from "@cloudinary/url-gen";



function App() {
  const cld = new Cloudinary({cloud: {cloudName: 'engpartnercloudinary'}})
  const cookies = new Cookies()
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))

  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/createuser" element={<CreateUser setIsAuth={setIsAuth} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/home" element={<Home setIsAuth={setIsAuth}/>} />
      <Route path="/createuser" element={<CreateUser />} />
      <Route path="*" element={<Navigate to="/home" />}/>
      <Route path='profile/:uid' element={<Profile/>}/>
      <Route path="connect" element={<Users/>}/>
    </Routes>
  );
}

export default App;
