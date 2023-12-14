// STYLES
import style from "./premium.module.css";
import verify from '../../assets/svg/verify.svg'

import * as React from 'react';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// TOOLS
import { auth, API_URL } from "../../firebase-config";
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyUser, setVip } from "../../redux/actions/actions";

// RENDERS
import Navbar from "../Navbar/Navbar";
import AnnualPremium from "./AnnualPremium";
import MonthPremium from "./MonthPremuim";

const stripePromise = loadStripe("pk_test_51OFi4pDa4OdRCPg7S1mBe55Usd8TeiSRRVlUiw6q3vJT7cHD7pdJqY5mdRaFBrmLMF9717TAW7Qg1GNXXfiTxzgF00K8IQSPkR");


function Premiun({ setIsAuth }) {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.users.name);
  const uid = localStorage.getItem("uid");
  const isVip = useSelector((state) => state.users.isVip);
  const vip = useSelector((state) => state.users.isVip);

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
          await axios.put(`${API_URL}/geton`,{ uid: uid, is:"notPremium"} )
          dispatch(setVip(false))
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
      <Navbar setIsAuth={setIsAuth}/>
        <div className={style.introPremiumDiv}>
          {vip ? 
          <h3 className={style.introH3}>Welcome to the VIP experience, {name} <img src={verify} className={style.iconVerify} />! Check out the features that will enhance your EngPartner experience!</h3>
          :
          <h3 className={style.introH3}>Unlock VIP with our <img src={verify} className={style.iconVerify} /> VIP membership!</h3>
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
