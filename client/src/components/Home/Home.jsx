import style from "./Home.module.css";
import logo from "../../assets/logo.png";
import crown from "../../assets/svg/crown.svg";
import connect from "../../assets/svg/connect.svg";
import logOut from "../../assets/svg/logout.svg";


//Tools
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../../firebase-config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyUser, clearUserDataInLogout } from '../../redux/actions/actions';
import axios from 'axios';

//Renders
import Friends from "./Friends/Friends";
import TopicsChat from "../Chats/TopicsChat/TopicsChat";
import TopicChat from '../Chats/TopicChat/TopicChat'
import { Navigate } from 'react-router-dom';

const Home = ({ setIsAuth }) => {
  const user = useSelector((state) => state.users.name);
  const userPhoto = useSelector((state) => state.users.photo);
  const dispatch = useDispatch();
  const uid = auth.currentUser?.uid;
  const localStorageUID = localStorage.getItem('uid');
  const photo = auth.currentUser?.photoURL;

  const [room, setRoom] = useState("global");
  const cookies = new Cookies();

  const handleLogOut = async () => {
    const uid = auth.currentUser.uid
    axios.put('http://localhost:3001/geton',{ uid, is:"off"} )
    cookies.remove("auth-token");
    localStorage.removeItem("uid");
    await signOut(auth);
    setIsAuth(false);
    dispatch(clearUserDataInLogout());
  };


  const foto = auth.currentUser?.photoURL
  const setingValueRoom = (value) => {
    if (value === 'null') {
      setRoom("global");
    } else {
      setRoom(value);
    }
  };

  useEffect(() => {
    console.log(uid)
    if (!localStorageUID) {
      signOut(auth);
      setIsAuth(false);
    }
    dispatch(getMyUser(localStorageUID));
    console.log('holas')
  }, [uid]);

  return (
    <>
      {localStorageUID ? (
        <div className={style.homeMainDiv}>
          <nav className={style.nav}>
            <Link to="/home">
              <img src={logo} alt="Home" className={style.logo} />
            </Link>
            <div>
              <TopicsChat setingValueRoom={setingValueRoom} />
            </div>
            <div className={style.navBtns}>
              <Link to='/connect'>
                <button className={style.connectBtn}>
                  <img src={connect} alt="connect" className={style.icon} />
                </button>
              </Link>
              <Link to='/premium'>
                <button className={style.premium}>
                  <img src={crown} alt="" className={style.icon} />
                </button>
              </Link>
              <button onClick={handleLogOut} className={style.signOut}>
                <img src={logOut} alt="logout" className={style.icon} />
              </button>
              <Link to={`/profile/${uid}`}>
                <img src={userPhoto} alt="" className={style.userPhoto} />
              </Link>
            </div>
          </nav>
          <div className={style.homeComponentsDiv}>
            <div className={style.globalChat}>
              <TopicChat room={room} setRoom={setRoom} />
            </div>
            <div className={style.friendsComp}>
              <Friends />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};


export default Home;