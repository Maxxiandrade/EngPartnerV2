import style from "./Profile.module.css";
import logo from "../../assets/logo.png";
import crown from "../../assets/svg/crown.svg";
import connect from "../../assets/svg/connect.svg";
import logOut from "../../assets/svg/logout.svg";
import pencil from "../../assets/svg/pencil.svg";
import tick from "../../assets/svg/tick.svg";
import addUser from "../../assets/svg/addUser.svg";
import deleteUser from "../../assets/svg/deleteUser.svg";
import chat from "../../assets/svg/chat.svg";
import group from "../../assets/svg/group.svg"
import Swal from 'sweetalert2';

//Tools
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { editUser, handleUser, setEditProfile } from "../../redux/actions/actions";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { getMyUser, clearUserDataInLogout, updateUserLanguage, updateUserReadLanguage } from "../../redux/actions/actions";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from "@mui/material";


const Profile = ({ setIsAuth }) => {

  const vip = useSelector(state => state.users.isVip)
  const admin = useSelector((state)=>state.users.isAdmin)
  const [colum,setColumn]= useState(false)

  const name = useSelector((state) => state.users.name);
  const lastname = useSelector((state) => state.users.lastname);
  const description = useSelector((state) => state.users.description);
  const age = useSelector((state) => state.users.age);

  const localStorageUID = localStorage.getItem('uid');
  const user = useSelector((state) => state.users);
  const language = localStorage.getItem('language');
  const languageRead = localStorage.getItem('languageRead');
  const uid = useSelector((state) => state.users.uid);
  const photo = useSelector((state) => state.users.photo);
  const friendList = useSelector((state) => state.users.friends);
  const dispatch = useDispatch();
  const params = useParams();
  const [isFriend, setisFriend] = useState(
    friendList.some((friend) => friend == params.uid)
  );
  const [edit, setEdit] = useState(false);
  const [aux, setAux] = useState(false);
  const friend = {
    uid: localStorageUID,
    friendId: params.uid,
  };
  const cookies = new Cookies();
  const [profile, setProfile] = useState();
  const [changes, setChanges] = useState({
    uid: params.uid,
    name: user?.name,
    lastname: user?.lastname,
    description: user?.description,
  });

  useEffect(() => {
    axios
      .post(`http://localhost:3001/user`, { uid: params.uid })
      .then(({ data }) => {
        if (data) {
          console.log(data);
          setProfile(data);
        }
        console.log(isFriend);
        console.log(user);
      });
  }, [params?.uid, friendList, isFriend]);

  useEffect(() => {
      dispatch(getMyUser(localStorageUID))
  }, []);

  const handleEdit = () => {
    if (!aux) {
      setEdit(true);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChanges({
      ...changes,
      [name]: value,
    });
  };

  const finishEdit = async () => {
    dispatch(editUser(changes));
    dispatch(setEditProfile(changes))
    setEdit(false);
    Swal.fire({
      title: `Your profile has been updated successfully!`,
      icon: "success",
      toast: true,
      timer: 3500,
      showConfirmButton: false,
      showCloseButton: true,
    })
  };

  const addFriend = (e) => {
    console.log(friend);
    setisFriend(true);
    dispatch(handleUser(friend, "add"));
    Swal.fire({
      title: `${profile.name} has been added to your friend list!`,
      text: `(${profile.user})`,
      icon: "success",
      toast: true,
      timer: 3000,
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  const removeFriend = (e) => {

    Swal.fire({
      title: `Are you sure you want to remove ${profile.name} from your friend list?`,
      icon: "warning",
      confirmButtonText: "Delete friend",
      confirmButtonColor: "#d33",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#3085d6",
      toast: true,
    }).then((result) => {
      if (result.isConfirmed) {
        friend.action = e.target.value;
        setisFriend(false);
        dispatch(handleUser(friend, "remove"));
        Swal.fire({
          title: `${profile.name} has been deleted from your friend list.`,
          icon: "success",
          toast: true,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleLogOut = async () => {
    axios.put("http://localhost:3001/geton", { uid, is: "off" });
    cookies.remove("auth-token");
    localStorage.removeItem("uid");
    await signOut(auth);
    setIsAuth(false);
    dispatch(clearUserDataInLogout());
  };

  console.log(friendList);

  if (localStorage.getItem("uid") === params.uid)
    return (
      <div className={style.profileMainDiv}>
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
              <img src={photo} alt="" className={style.userPhoto} onClick={()=>setColumn(!colum)} />
                {colum ?
                  <ul className={style.column}>
                  <li className={style.li}>
                    <Link to={`/profile/${uid}`}>
                      <div className={style.dropDownDiv}>
                      <img src={photo} alt="" className={style.userPhoto2} />
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
        {profile && (
          <div className={style.profileContainer}>
            <div className={style.photoDiv}>
              <img
                src={profile.photo}
                alt="Profile"
                className={style.profilePhoto}
              />
            </div>
            <div className={style.profileInfo}>
              <div className={style.infoDiv}>
                <h1 className={style.profileName}>
                  {name} {lastname} ({age})
                </h1>
                <h3 className={style.profileCountry}>{profile.country}</h3>
                <h3 className={style.profileSex}>{profile.sex}</h3>
                <p className={style.profileDescription1}>Description:</p>
                <p className={style.profileDescription2}>
                  {description}
                </p>
              </div>

              <FormControl>
                <label htmlFor="language">Your selected language:</label>
                <Select
                  name="language"
                  defaultValue={language}
                  onChange={(e) => {
                    updateUserLanguage({uid: localStorageUID, language: e.target.value})
                  }}
                >
                  <MenuItem value={'en'}>English 🇬🇧</MenuItem>
                  <MenuItem value={'es'}>Spanish 🇪🇸</MenuItem>
                  <MenuItem value={'fr'}>French 🇫🇷</MenuItem>
                  <MenuItem value={'it'}>Italian 🇮🇹</MenuItem>
                  <MenuItem value={'de'}>German 🇩🇪</MenuItem>
                  <MenuItem value={'nl'}>Dutch (Holland) 🇳🇱</MenuItem>
                  <MenuItem value={'pt'}>Portuguese 🇵🇹</MenuItem>
                  <MenuItem value={'ru'}>Russian 🇷🇺</MenuItem>
                  <MenuItem value={'zh'}>Chinese (Simplified) 🇨🇳</MenuItem>
                  <MenuItem value={'zh-TW'}>Chinese (Traditional) 🇨🇳</MenuItem>
                  <MenuItem value={'ko'}>Korean 🇰🇷</MenuItem>
                  <MenuItem value={'gn'}>Guarani 🇵🇾</MenuItem>
                  <MenuItem value={'id'}>Indonesian 🇮🇩</MenuItem>
                </Select>

                <label htmlFor="languageRead" style={{ marginTop: "50px" }}>Your reading language:</label>
                <Select
                  name="languageRead"
                  defaultValue={languageRead}
                  onChange={(e) => {

                    updateUserReadLanguage({uid: localStorageUID, languageRead: e.target.value})
                  }}
                >
                  <MenuItem value={'en'}>English 🇬🇧</MenuItem>
                  <MenuItem value={'es'}>Spanish 🇪🇸</MenuItem>
                  <MenuItem value={'fr'}>French 🇫🇷</MenuItem>
                  <MenuItem value={'it'}>Italian 🇮🇹</MenuItem>
                  <MenuItem value={'de'}>German 🇩🇪</MenuItem>
                  <MenuItem value={'nl'}>Dutch (Holland) 🇳🇱</MenuItem>
                  <MenuItem value={'pt'}>Portuguese 🇵🇹</MenuItem>
                  <MenuItem value={'ru'}>Russian 🇷🇺</MenuItem>
                  <MenuItem value={'zh'}>Chinese (Simplified) 🇨🇳</MenuItem>
                  <MenuItem value={'zh-TW'}>Chinese (Traditional) 🇨🇳</MenuItem>
                  <MenuItem value={'ko'}>Korean 🇰🇷</MenuItem>
                  <MenuItem value={'gn'}>Guarani 🇵🇾</MenuItem>
                  <MenuItem value={'id'}>Indonesian 🇮🇩</MenuItem>
                </Select>
              </FormControl>

              <button onClick={handleEdit} className={style.edit}>
                <img src={pencil} alt="Edit" className={style.iconBtn} />
              </button>
              {edit && (
                <>
                  <button onClick={finishEdit} className={style.save}>
                    <img src={tick} alt="Done" className={style.iconBtn} />
                  </button>
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
                </>
              )}
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
              <img src={photo} alt="" className={style.userPhoto} onClick={()=>setColumn(!colum)} />
                {colum ?
                  <ul className={style.column}>
                  <li className={style.li}>
                    <Link to={`/profile/${uid}`}>
                      <div className={style.dropDownDiv}>
                      <img src={photo} alt="" className={style.userPhoto2} />
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
      {profile && (
        <div className={style.profileContainer}>
          <div className={style.photoDiv}>
            <img
              src={profile.photo}
              alt="Profile"
              className={style.profilePhoto}
            />
          </div>
          <div className={style.profileInfo}>
            {!isFriend ? (
              <button onClick={addFriend} value="add" className={style.edit}>
                <img src={addUser} alt="AddFriend" className={style.iconBtn} />
              </button>
            ) : (
              <button
                onClick={removeFriend}
                value="remove"
                className={style.edit}
              >
                <img
                  src={deleteUser}
                  alt="DeleteFriend"
                  className={style.iconBtn}
                />
              </button>
            )}
            <div className={style.infoDiv}>
              <h1 className={style.profileName}>
                {profile.name} {profile.lastname} ({profile.age})
              </h1>
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
