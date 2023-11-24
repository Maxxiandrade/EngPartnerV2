import style from "./Home.module.css";

//Tools
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../../firebase-config";
import { Link } from "react-router-dom";

//Renders
import logo from "../../assets/logo-EngPartner.png";
import Users from "./Users/Users";
import GlobalChat from "../Chats/GlobalChat/GlobalChat";



const Home = ({ setIsAuth }) => {
  const cookies = new Cookies();
  const handleLogOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  };

  const user = auth.currentUser?.displayName;

  return (
    <>
    <nav className={style.nav}>
        <img src={logo} className={style.logo} />
        <h2 className="">Welcome, {user} !</h2>
        <div>
          <Link to='/profile'>
          <button className={style.profileBtn}>Your profile</button>
          </Link>
          <Link to='/premium'>
          <button className={style.premium}>Premium</button>
          </Link>
          <button onClick={handleLogOut} className={style.signOut}>Log out</button>
        </div>
      </nav>
      <div className={style.globalChat}>
        <GlobalChat />
      </div>
        <div className={style.container}>
      <div className={style.users}>
        <Link to="/topics">
          <button className={style.topic}>
            Search for a topic to talk about!
          </button>
        </Link>
        <Users />
      </div>
    </div>
    </>
  );
};

export default Home;
