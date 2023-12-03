import style from "./premium.module.css";
import logo from "../../assets/logo.png";
import crown from "../../assets/svg/crown.svg";
import connect from "../../assets/svg/connect.svg";
import logOut from "../../assets/svg/logout.svg";
import chat from "../../assets/svg/chat.svg"

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AnnualPremium from "./AnnualPremium";
import MonthPremium from "./MonthPremuim";

const stripePromise = loadStripe("pk_test_51OFi4pDa4OdRCPg7S1mBe55Usd8TeiSRRVlUiw6q3vJT7cHD7pdJqY5mdRaFBrmLMF9717TAW7Qg1GNXXfiTxzgF00K8IQSPkR");


function Premiun() {
  const uid = useSelector((state) => state.users.uid);
  const isVip = useSelector((state) => state.users.isVip);
  return (
    <div className={style.premiumMainDiv}>
      <nav className={style.nav}>
        <Link to="/home">
          <img src={logo} alt="Home" className={style.logo} />
        </Link>
      </nav>
      <div className={style.premiumCoponentsDiv}>
          <Elements stripe={stripePromise}>
            <AnnualPremium key="annual" isVip={isVip} uid={uid} />
          </Elements>
          <Elements stripe={stripePromise}>
            <MonthPremium key="month" isVip={isVip} uid={uid} />
          </Elements>
      </div>
    </div>
  )
}

export default Premiun;
