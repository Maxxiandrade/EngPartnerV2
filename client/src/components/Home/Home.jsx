import style from "./Home.module.css";
import logo from "../../assets/logo.png";
import crown from "../../assets/svg/crown.svg";
import connect from "../../assets/svg/connect.svg";
import logOut from "../../assets/svg/logout.svg";
import chat from "../../assets/svg/chat.svg"
import group from "../../assets/svg/group.svg"
import report from "../../assets/svg/report.svg"


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
import { API_URL } from "../../firebase-config";


const Home = ({ setIsAuth }) => {
  console.log('Entorno:', API_URL);
  const vip = useSelector(state => state.users.isVip)
  const admin = useSelector((state)=>state.users.isAdmin)
  const [colum,setColumn]= useState(false)
  const userPhoto = useSelector((state) => state.users.photo);
  const dispatch = useDispatch();
  const uid = auth.currentUser?.uid;
  const localStorageUID = localStorage.getItem('uid');
  const photo = auth.currentUser?.photoURL;

  const [room, setRoom] = useState("global");
  const cookies = new Cookies();

  const handleLogOut = async () => {
    const uid = auth.currentUser.uid
    axios.put(`${API_URL}/geton`,{ uid, is:"off"} )
    cookies.remove("auth-token");
    localStorage.removeItem("uid");
    await signOut(auth);
    setIsAuth(false);
    dispatch(clearUserDataInLogout());
  };


  const setingValueRoom = (value) => {
    if (value === 'null') {
      setRoom("global");
    } else {
      setRoom(value);
    }
  };

  useEffect(() => {
    console.log(uid)
    console.log("is admin" + " " + admin)
    if (!localStorageUID) {
      signOut(auth);
      setIsAuth(false);
    }
    dispatch(getMyUser(localStorageUID));
    console.log('holas')
  }, [uid]);

  console.log(vip)
  if(admin){
    return(<>
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
                  <li className={style.li}>
                    <Link to="/admin">
                      <div className={style.dropDownDiv}>
                        <img src={report} alt="admin" className={style.icon}/>
                        <span className={style.dropDownSpan}>Admin Panel</span>
                      </div>
                    </Link>
                  </li>
                  <li className={style.li}>
                    <Link to='/CreateRoom'>
                      <div className={style.dropDownDiv}>
                    <img src={group} alt="group" className={style.icon} />
                        <span className={style.dropDownSpan}>Create Room</span>
                    </div>
                    </Link>
                  </li>
                  <li className={style.li}>
                    <div className={style.dropDownDiv} onClick={handleLogOut}>
                    <img src={logOut} alt="logout" className={style.icon} />
                        <span className={style.dropDownSpan}><b>Logout</b></span>
                    </div>
                  </li>
                </ul>: ''}
            </div>
          </nav>
          <div className={style.homeComponentsDiv}>
            <div className={style.globalChat}>
              <TopicChat room={room} setRoom={setRoom} />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
    )
  }else return (
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
          <div className={style.homeComponentsDiv}>
            <div className={style.globalChat}>
              <TopicChat room={room} setRoom={setRoom} />
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