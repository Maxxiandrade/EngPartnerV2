import style from "./PrivateChat.module.css";
import logo from "../../../assets/logo.png";
import crown from "../../../assets/svg/crown.svg";
import connect from "../../../assets/svg/connect.svg";
import logOut from "../../../assets/svg/logout.svg";
import chat from "../../../assets/svg/chat.svg"
import group from "../../../assets/svg/group.svg"
import report from "../../../assets/svg/report.svg"


import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../../../firebase-config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyUser, clearUserDataInLogout } from '../../../redux/actions/actions';
import axios from 'axios';

import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Friends from "../../Home/Friends/Friends";


const PrivateChat = ({ setIsAuth }) => {

    const uid = localStorage.getItem("uid");
    const admin = useSelector((state) => state.users.isAdmin);
    const userPhoto = useSelector((state) => state.users.photo);

    const dispatch = useDispatch();

    const cookies = new Cookies();

    const handleLogOut = async () => {
        axios.put('http://localhost:3001/geton', { uid, is: "off" })
        cookies.remove("auth-token");
        localStorage.removeItem("uid");
        await signOut(auth);
        setIsAuth(false);
        dispatch(clearUserDataInLogout());
    };

    useEffect(() => {
      dispatch(getMyUser(uid));
    }, []);

    return (
        <div className={style.home}>
            <nav className={style.nav}>
                <Link to="/home">
                    <img src={logo} alt="Home" className={style.logo} />
                </Link>
                <div className={style.navBtns}>
              <Link to="/admin">
              <button className={style.adminBtn}><img src={report} alt="admin" className={style.icon} /></button>
              </Link>
            <Link to='/messages'>
              <button className={style.chatBtn}><img src={chat} alt="chat" className={style.icon} /></button>
            </Link>
              <Link to='/CreateRoom'>
              <button className={style.groupBtn}><img src={group} alt="group" className={style.icon} /></button>
              </Link>
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
            <div className={style.componentsDiv}>
                <div className={style.container}>
                    <Sidebar />
                    <Chat />
                </div>
                <div className={style.friendsComp}>
                    <Friends />
                </div>
            </div>
        </div>
    )
};

export default PrivateChat;