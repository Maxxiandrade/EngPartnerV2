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

const Home = ({ setIsAuth }) => {
  const dispatch = useDispatch();
  const uid = auth.currentUser?.uid;

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
    const fetchData = async () => {
      await dispatch(getMyUser(uid));
      // Ahora, el estado debería estar actualizado
    };

    fetchData();
  }, [dispatch, uid]);

  // Acceder a la propiedad name del estado
  const user = useSelector((state) => state.users.name);

  return (
    <div className={style.homeMainDiv}>
      <nav className={style.nav}>
      <img src={logo} className={style.logo}/>
      <div className={style.homeH2Div}>
        <h2 className={style.homeH2}>Welcome, {user} !</h2>
      </div>
        <div>
          <Link to={`/profile/${uid}`}>
            <button className={style.profileBtn}>Profile</button>
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
  );
};

export default Home;
