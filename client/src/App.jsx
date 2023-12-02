import "./App.css";

//Components to render
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CreateUser from "./components/CreateUser/CreateUser";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Users from "./components/Home/Users/Users";
import Premium from "./components/Premium/Premium";

//Tools
import { useEffect, useState} from "react";
import Cookies from 'universal-cookie';
import { Routes, Route, Navigate } from "react-router-dom";
import {Cloudinary} from "@cloudinary/url-gen";
import PrivateChat from "./components/Chats/PrivateChat/PrivateChat";
import CreateNewRooms from "./components/CreateNewRooms/CreateNewRooms";



function App() {
  const cld = new Cloudinary({cloud: {cloudName: 'engpartnercloudinary'}})
  const cookies = new Cookies()
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))

  useEffect(() => {
    console.log(isAuth);
  }, [isAuth])

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
      <Route path='profile/:uid' element={<Profile setIsAuth={setIsAuth}/>}/>
      <Route path="connect" element={<Users/>}/>
      <Route path="/premium" element={<Premium/>}/>
      <Route path="/messages" element={<PrivateChat/>}/>
      <Route path="/CreateRoom" element={<CreateNewRooms/>}/>
    </Routes>
  );
}

export default App;
