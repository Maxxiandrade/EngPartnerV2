import style from "./premium.module.css";
import logo from "../../assets/logo.png";
import crown from "../../assets/svg/crown.svg";
import connect from "../../assets/svg/connect.svg";
import logOut from "../../assets/svg/logout.svg";
import chat from "../../assets/svg/chat.svg"


import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../../firebase-config";
import { clearUserDataInLogout } from '../../redux/actions/actions';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import { useSelector , useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import AnnualPremium from "./AnnualPremium";
import MonthPremium from "./MonthPremuim";
import logo from "../../assets/logo-EngPartner.png";
import { useEffect } from "react";
import { getMyUser } from "../../redux/actions/actions";

const stripePromise = loadStripe("pk_test_51OFi4pDa4OdRCPg7S1mBe55Usd8TeiSRRVlUiw6q3vJT7cHD7pdJqY5mdRaFBrmLMF9717TAW7Qg1GNXXfiTxzgF00K8IQSPkR");

function Premiun({setIsAuth}) {
  const dispatch = useDispatch();
  const userPhoto = useSelector((state) => state.users.photo);
  const uid = localStorage.getItem("uid");
  const isVip = useSelector((state) => state.users.isVip);
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
  
  useEffect(() => {
    dispatch(getMyUser(uid));
  }, [])

  return (
    <div className={style.premiumMainDiv}>
      <nav className={style.nav}>
            <Link to="/home">
              <img src={logo} alt="Home" className={style.logo} />
            </Link>
            <div>
              <Link to="/admin">
              <h1>Admin panel</h1>
              </Link>
            </div>
            <div className={style.navBtns}>
            <Link to='/messages'>
              <button>Chats</button>
              </Link>
              <Link to='/CreateRoom'>
              <button className={style.premium}>
                 Create Group
                </button>
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
