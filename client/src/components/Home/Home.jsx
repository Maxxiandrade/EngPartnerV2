import style from "./Home.module.css";


//Tools
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyUser, getReported } from '../../redux/actions/actions';

//Renders
import RateCard from "../RateCard/RateCard";
import Navbar from "../Navbar/Navbar";
import TopicChat from '../Chats/TopicChat/TopicChat'
import { Navigate } from 'react-router-dom';
import { API_URL } from "../../firebase-config";
import { useState } from "react";

const Home = ({ setIsAuth }) => {
  console.log(`Entorno: ${import.meta.env.MODE}, URL del back a que apunta: ${API_URL}`);
  const dispatch = useDispatch();
  const uid = auth.currentUser?.uid;
  const localStorageUID = localStorage.getItem('uid');
  const [rating, setRating] = useState(false)



  useEffect(() => {
    console.log(uid)
    if (!localStorageUID) {
      signOut(auth);
      setIsAuth(false);
    }
    dispatch(getReported())
    dispatch(getMyUser(localStorageUID));
    console.log('holas')
  }, [uid]);

   return (
     <>
      {localStorageUID ? (
        <div className={style.homeMainDiv}>
          <Navbar setIsAuth={setIsAuth} rating={rating} setRating={setRating}/>
          <div className={style.homeComponentsDiv}>
            <div className={style.globalChat}>
              <TopicChat/>
            </div>
          </div>
          {rating ?
            <RateCard/>:''}
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};



export default Home;