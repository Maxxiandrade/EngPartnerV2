import { loadStripe } from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import style from "./premium.module.css";
import AnnualPremium from "./AnnualPremium";
import MonthPremium from "./MonthPremuim";
import logo from "../../assets/logo-EngPartner.png";
import { useEffect } from "react";
import { getMyUser } from "../../redux/actions/actions";


const stripePromise = loadStripe("pk_test_51OFi4pDa4OdRCPg7S1mBe55Usd8TeiSRRVlUiw6q3vJT7cHD7pdJqY5mdRaFBrmLMF9717TAW7Qg1GNXXfiTxzgF00K8IQSPkR");


function Premiun() {
  const dispatch = useDispatch();
  const uid = localStorage.getItem("uid");
  const isVip = useSelector((state) => state.users.isVip); 
  
  useEffect(() => {
    dispatch(getMyUser(uid));
  }, [])

    return (
      <div>
      <nav className={style.nav}>
        <Link to="/home">
          <button className={style.homeBtn}><img src={logo} alt="Home" className={style.logo} /></button>
        </Link>
      </nav>
      <div className={style.containerPremium}>
      <Elements stripe={stripePromise}>
            <AnnualPremium key="annual" isVip={isVip} uid={uid} />
      </Elements>
      <Elements stripe={stripePromise}>
           <MonthPremium key="month" isVip={isVip} uid={uid}  />
      </Elements>
      </div>
      
      </div>
    )
}

export default Premiun;
