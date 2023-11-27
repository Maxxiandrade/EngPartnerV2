import style from "./Home.module.css";

//Tools
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../../firebase-config";
import { Link } from "react-router-dom";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getMyUser} from '../../redux/actions/actions';
import axios from 'axios';

//Renders
import logo from "../../assets/logo-EngPartner.png";
import crown from "../../assets/crown.svg";

import TopicsChat from "../Chats/TopicsChat/TopicsChat";
import TopicChat from '../Chats/TopicChat/TopicChat'

import { Navigate } from 'react-router-dom';

const Home = ({ setIsAuth }) => {
  const user = useSelector((state) => state.users.name);
  const userPhoto = useSelector((state) => state.users.photo);
  const dispatch = useDispatch();
  const uid = auth.currentUser?.uid;
  const photo = auth.currentUser?.photoURL;

  const [room, setRoom] = useState("global");
  const cookies = new Cookies();
  
  const handleLogOut = async () => {
    const uid = auth.currentUser.uid
    axios.put('http://localhost:3001/geton',{ uid, is:"off"} )
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  };

  const setingValueRoom = (value) => {
    if (value === 'null') {
      setRoom("global");
    } else {
      setRoom(value);
    }
  };

  useEffect(() => {
    console.log(uid)
    if ( uid === undefined) {
      signOut(auth);
      setIsAuth(false);
    }
    dispatch(getMyUser(uid));
    console.log('holas')
  }, [uid, dispatch]);

  return (

  <>
    {uid ? (
    <div className={style.homeMainDiv}>
      <nav className={style.nav}>
        <Link to="/home">
          <button className={style.homeBtn}><img src={logo} alt="Home" className={style.logo} /></button>
        </Link>
      <div className={style.homeH2Div}>
        <h2 className={style.homeH2}>Welcome, {user} !</h2>
      </div>
        <div className={style.navBtns}>
          <Link to={`/profile/${uid}`}>
            <img src={userPhoto} alt="" className={style.userPhoto} />
          </Link>
          <Link to='/connect'>
            <button className={style.connectBtn}>Connect</button>
          </Link>
          <Link to='/premium'>
            <button className={style.premium}>
            <img src={crown} alt="" className={style.crown}/>Get VIP
            </button>
          </Link>
          <button onClick={handleLogOut} className={style.signOut}>Log out</button>
        </div>
        <TopicsChat setingValueRoom={setingValueRoom}/>
      </nav>
      <div className={style.globalChat}>
        <TopicChat room={room} setRoom={setRoom} />
      </div>
    </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
    
  );
};


export default Home;
