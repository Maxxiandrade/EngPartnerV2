import style from "./PrivateChat.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyUser, clearUserDataInLogout, getFriends } from '../../../redux/actions/actions';

import Navbar from "../../Navbar/Navbar";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Friends from "../../Home/Friends/Friends";
import { API_URL } from "../../../firebase-config";


const PrivateChat = ({ setIsAuth }) => {
  const uid = localStorage.getItem("uid");
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.users.friends);
  console.log(friends);

  useEffect(() => {
    dispatch(getFriends(uid));
  }, []);

  return (
    <div className={style.home}>
      <Navbar setIsAuth={setIsAuth} />
      <div className={style.componentsDiv}>
        <div className={style.container}>
          <Sidebar />
          <Chat />
        </div>
        <div className={style.friendsComp}>
          <Friends friends={friends} />
        </div>
      </div>
    </div>
  )
};

export default PrivateChat;