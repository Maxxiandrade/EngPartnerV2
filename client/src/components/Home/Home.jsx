import style from "./Home.module.css";

//Tools
import { auth } from "../../firebase-config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyUser, clearUserDataInLogout } from '../../redux/actions/actions';
import axios from 'axios';

//Renders
import Navbar from "../Navbar/Navbar";
import Friends from "./Friends/Friends";
import TopicsChat from "../Chats/TopicsChat/TopicsChat";
import TopicChat from '../Chats/TopicChat/TopicChat'
import { Navigate } from 'react-router-dom';
import { API_URL } from "../../firebase-config";


const Home = ({ setIsAuth }) => {
  console.log(`Entorno: ${import.meta.env.MODE}, URL del back a que apunta: ${API_URL}`);
  const dispatch = useDispatch();
  const uid = auth.currentUser?.uid;
  const localStorageUID = localStorage.getItem('uid');



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
          <Navbar setIsAuth={setIsAuth}/>
          <div className={style.homeComponentsDiv}>
            <div className={style.globalChat}>
              <TopicChat/>
             
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