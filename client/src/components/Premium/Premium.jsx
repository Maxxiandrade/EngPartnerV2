import style from "./premium.module.css";
import logo from "../../assets/logo.png";
import crown from "../../assets/svg/crown.svg";
import connect from "../../assets/svg/connect.svg";
import logOut from "../../assets/svg/logout.svg";
import chat from "../../assets/svg/chat.svg"
import group from "../../assets/svg/group.svg"
import report from "../../assets/svg/report.svg"
import verify from '../../assets/svg/verify.svg'
import * as React from 'react';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
 

import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth, API_URL } from "../../firebase-config";
import { clearUserDataInLogout } from '../../redux/actions/actions';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import AnnualPremium from "./AnnualPremium";
import MonthPremium from "./MonthPremuim";
import { useEffect } from "react";
import { getMyUser, setVip } from "../../redux/actions/actions";

const stripePromise = loadStripe("pk_test_51OFi4pDa4OdRCPg7S1mBe55Usd8TeiSRRVlUiw6q3vJT7cHD7pdJqY5mdRaFBrmLMF9717TAW7Qg1GNXXfiTxzgF00K8IQSPkR");


function Premiun({ setIsAuth }) {
  const dispatch = useDispatch();
  const userPhoto = useSelector((state) => state.users.photo);
  const name = useSelector((state) => state.users.name);
  const uid = localStorage.getItem("uid");
  const isVip = useSelector((state) => state.users.isVip);
  const vip = useSelector((state) => state.users.isVip);
  const cookies = new Cookies();
  const admin = useSelector((state)=>state.users.isAdmin)
  const [colum,setColumn]= useState(false)

  const handleLogOut = async () => {
    const uid = auth.currentUser.uid
    axios.put(`${API_URL}/geton`, { uid, is: "off" })
    cookies.remove("auth-token");
    localStorage.removeItem("uid");
    await signOut(auth);
    setIsAuth(false);
    dispatch(clearUserDataInLogout());
  };

  const handleUnsuscribe = async () => {
    Swal.fire({
      title: "Are you sure you want to unsuscribe?",
      text: "We will miss you :(",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Unsuscribe"
    }).then( async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put('http://localhost:3001/geton',{ uid: uid, is:"notPremium"} )
          dispatch(setVip(false))
          console.log("premium sacado");
          Swal.fire({
            title: "Subscription deleted!",
            text: "You unsuscribed successfully.",
            icon: "success",
            confirmButtonColor: "#39b300",
            timer: 3000
          });
          dispatch(getMyUser(uid))
        } catch (error) {
          throw Error(error);
        }
      }
    });

    
  }

  useEffect(()=>{
    dispatch(getMyUser(uid))
  },[])

  return (
    <div className={style.premiumMainDiv}>
      <nav className={style.nav}>
            <Link to="/home">
              <img src={logo} alt="Home" className={style.logo} />
            </Link>
            <div className={style.navBtns}>
            <Link to='/messages'>
              <button className={style.chatBtn}><img src={chat} alt="chat" className={style.icon} /></button>
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
              <img src={userPhoto} alt="" className={style.userPhoto} onClick={()=>setColumn(!colum)} />
                {colum ?
                  <ul className={style.column}>
                  <li className={style.li}>
                    <Link to={`/profile/${uid}`}>
                      <div className={style.dropDownDiv}>
                      <img src={userPhoto} alt="" className={style.userPhoto2} />
                      <span className={style.dropDownSpan}>Profile</span>
                      </div>
                    </Link>
                  </li>
                  {vip?
                  <li className={style.li}>
                    <Link to='/CreateRoom'>
                      <div className={style.dropDownDiv}>
                    <img src={group} alt="group" className={style.icon} />
                        <span className={style.dropDownSpan}>Create Room</span>
                    </div>
                    </Link>
                  </li>:""}                  
                  <li className={style.li}>
                    <div className={style.dropDownDiv} onClick={handleLogOut}>
                    <img src={logOut} alt="logout" className={style.icon} />
                        <span className={style.dropDownSpan}><b>Logout</b></span>
                    </div>
                  </li>
                </ul>: ''}
              
            </div>
          </nav>
        <div className={style.introPremiumDiv}>
          {vip ? 
          <h3 className={style.introH3}>Welcome to the VIP experience, {name} <img src={verify} className={style.iconVerify} />! Check out the features that will enhance your EngPartner experience!</h3>
          :
          <h3 className={style.introH3}>Unlock a premium experience with our <img src={verify} className={style.iconVerify} /> VIP membership!</h3>
          }

          {vip ?
          <p className={style.introH3}>Go enjoy our 'CREATE ROOM' special feature! You cant test it by clicking your Profile Pic {'>'} 'Create Room' </p>
          :
          <p className={style.introH3}>Get exclusive access to features that will enhance your EngPartner experience.
          You can choose between our monthly or annual subscription.</p>
          }
        </div>
      <div className={style.premiumCoponentsDiv}>
        <Elements stripe={stripePromise}>
          <MonthPremium key="month" isVip={isVip} uid={uid} />
        </Elements>
        <Elements stripe={stripePromise}>
          <AnnualPremium key="annual" isVip={isVip} uid={uid} />
        </Elements>
      </div>

        {isVip && <Button variant="contained" color="error" sx={{ width: "20%", margin: '0 auto', marginTop: '30px' }}
          onClick={handleUnsuscribe}>Unsuscribe</Button>}
    </div>
  )
}

export default Premiun;
