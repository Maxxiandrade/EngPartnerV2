import style from "./Home.module.css";

//Tools
import axios from 'axios'
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../../firebase-config";
import { Link } from "react-router-dom";
import { useState } from "react";

//Renders
import logo from "../../assets/logo-EngPartner.png";
import GlobalChat from "../Chats/GlobalChat/GlobalChat";
import TopicsChat from "../Chats/TopicsChat/TopicsChat";
import TopicChat from '../Chats/TopicChat/TopicChat'

const Home = ({ setIsAuth }) => {
  const uid = auth.currentUser.uid;
  const [room, setRoom] = useState(null)
  const cookies = new Cookies();

  const handleLogOut = async () => {
    const uid = auth.currentUser.uid
    axios.put('http://localhost:3001/geton',{ uid, is:"off"} )
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  };
  const setingValueRoom =(value)=>{
    if (value == 'null') {
      setRoom(null)
      console.log(room)
    }else{
      setRoom(value)
      console.log(room)
      
    } 
  }

  const user = auth.currentUser?.displayName;

  return (
    <>
      <nav className={style.nav}>
        <img src={logo} className={style.logo} />
        <h2 className="">Welcome, {user} !</h2>
        <div>
          <Link to={`/profile/${uid}`}>
            <button className={style.profileBtn}>Your profile</button>
          </Link>
          <Link to="/premium">
            <button className={style.premium}>Premium</button>
          </Link>
          <button onClick={handleLogOut} className={style.signOut}>
            Log out
          </button>
          <Link to="/connect">
            <button>Connect</button>
          </Link>
        </div>
        <TopicsChat setingValueRoom={setingValueRoom}/>
      </nav>
      <div className={style.globalChat}>
        {room ? 
        <TopicChat room={room} setRoom={setRoom}/>
        :
        <GlobalChat />
        }
      </div>
    </>
  );
};

export default Home;
