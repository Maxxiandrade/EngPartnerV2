import style from "./Profile.module.css";
import logo from "../../assets/logo.png";
import crown from "../../assets/svg/crown.svg";
import connect from "../../assets/svg/connect.svg";
import logOut from "../../assets/svg/logout.svg";
import pencil from "../../assets/svg/pencil.svg"
import tick from "../../assets/svg/tick.svg"
import addUser from "../../assets/svg/addUser.svg"
import deleteUser from "../../assets/svg/deleteUser.svg"

//Tools
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { editUser, handleUser } from "../../redux/actions/actions";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { getMyUser, clearUserDataInLogout } from '../../redux/actions/actions';
import { API_URL } from "../../../../server/firebase-confing";

const Profile = ({ setIsAuth }) => {
  const user = useSelector((state) => state.users)
  const uid = useSelector((state) => state.users.uid)
  const photo = useSelector((state) => state.users.photo)
  const friendList = useSelector((state) => state.users.friends)
  const dispatch = useDispatch();
  const params = useParams();
  const [isFriend, setisFriend] = useState(friendList.some((friend) => friend.id == params.uid))
  const [edit, setEdit] = useState(false)
  const [aux, setAux] = useState(false)
  const friend = {
    uid: user.uid,
    friendId: params.uid,
  }
  const cookies = new Cookies();
  const [profile, setProfile] = useState();
  const [changes, setChanges] = useState({
    uid: params.uid,
    name: "",
    lastname: "",
    description: ""
  });

  useEffect(() => {
    console.log(params.uid)
    console.log(friendList)
    console.log(isFriend)
    axios
      .post(`${API_URL}/user`, { uid: params.uid })
      .then(({ data }) => {
        if (data) {
          console.log(data);
          setProfile(data);
        }
      });
  }, [params?.uid, friendList, isFriend]);

  const handleEdit = () => {
    if (!aux) {
      setEdit(true)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChanges({
      ...changes,
      [name]: value,
    });
  };

  const finishEdit = () => {
    dispatch(editUser(changes))
    setEdit(false)
  }

  const addFriend = (e) => {
    friend.action = e.target.value
    setisFriend(true)
    dispatch(handleUser(friend))
  }

  const removeFriend = (e) => {
    friend.action = e.target.value
    setisFriend(false)
    dispatch(handleUser(friend))
  }

  const handleLogOut = async () => {
    axios.put('http://localhost:3001/geton', { uid, is: "off" })
    cookies.remove("auth-token");
    localStorage.removeItem("uid");
    await signOut(auth);
    setIsAuth(false);
    dispatch(clearUserDataInLogout());
  }

  if (localStorage.getItem("uid") === params.uid) return (
    <div className={style.profileMainDiv}>
      <nav className={style.nav}>
        <Link to="/home">
          <img src={logo} alt="Home" className={style.logo} />
        </Link>
        <div className={style.navBtns}>
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
          <Link to={'/home'}>
            <img src={photo} alt="" className={style.userPhoto} />
          </Link>
        </div>
      </nav>
      {profile && (
        <div className={style.profileContainer}>
          <div className={style.photoDiv}>
            <img src={profile.photo} alt="Profile" className={style.profilePhoto} />
          </div>
          <div className={style.profileInfo}>
            <div className={style.infoDiv}>
              <h1 className={style.profileName}>{profile.name} {profile.lastname} ({profile.age})</h1>
              <h3 className={style.profileCountry}>{profile.country}</h3>
              <h3 className={style.profileSex}>{profile.sex}</h3>
              <p className={style.profileDescription1}>Description:</p>
              <p className={style.profileDescription2}>{profile.description}</p>
            </div>
            <button onClick={handleEdit} className={style.edit}>
              <img src={pencil} alt="Edit" className={style.iconBtn} />
            </button>
            {edit && <><button onClick={finishEdit} className={style.save}><img src={tick} alt="Done" className={style.iconBtn} /></button>
              <div className={style.inputDivContainer}>
                <div className={style.inputDiv}>
                  <h2>Edit Profile</h2>
                  <input
                    type="text"
                    placeholder={profile.name}
                    onChange={handleChange}
                    value={changes.name}
                    name="name"
                  />
                  <br />
                  <input
                    type="text"
                    placeholder={profile.lastname}
                    onChange={handleChange}
                    value={changes.lastname}
                    name="lastname"
                  />
                  <br />
                  <input
                    type="text"
                    placeholder={profile.description}
                    onChange={handleChange}
                    value={changes.description}
                    name="description"
                  />
                </div>
              </div>
            </>}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={style.profileMainDiv}>
      <nav className={style.nav}>
        <Link to="/home">
          <img src={logo} alt="Home" className={style.logo} />
        </Link>
        <div className={style.navBtns}>
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
          <Link to={'/home'}>
            <img src={photo} alt="" className={style.userPhoto} />
          </Link>
        </div>
      </nav>
      {profile && (
        <div className={style.profileContainer}>
          <div className={style.photoDiv}>
          <img src={profile.photo} alt="Profile" className={style.profilePhoto} />
          </div>
          <div className={style.profileInfo}>
            {!isFriend ? <button onClick={addFriend} value={'add'} className={style.edit}><img src={addUser} alt="AddFriend" className={style.iconBtn} /></button> : <button onClick={removeFriend} value={'remove'} className={style.edit}><img src={deleteUser} alt="DeleteFriend" className={style.iconBtn} /></button>}
            <div className={style.infoDiv}>
            <h1 className={style.profileName}>{profile.name} {profile.lastname} ({profile.age})</h1>
            <br />
            <h3 className={style.profileCountry}>{profile.country}</h3>
            <h3 className={style.profileSex}>{profile.sex}</h3>
            <p className={style.profileDescription1}>Description: </p>
            <p className={style.profileDescription2}>{profile.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;