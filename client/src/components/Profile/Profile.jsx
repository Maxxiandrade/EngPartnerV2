//STYLES
import style from "./Profile.module.css";
import pencil from "../../assets/svg/pencil.svg";
import tick from "../../assets/svg/tick.svg";
import addUser from "../../assets/svg/addUser.svg";
import deleteUser from "../../assets/svg/deleteUser.svg";
import verify from '../../assets/svg/verify.svg'
import Swal from 'sweetalert2';

//Tools
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { editUser, handleUser, setEditProfile } from "../../redux/actions/actions";
import { API_URL } from "../../firebase-config";
import { getMyUser, updateUserLanguage, updateUserReadLanguage } from "../../redux/actions/actions";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from "@mui/material";

// RENDERS
import Navbar from "../Navbar/Navbar";
import { getFlagByCode } from '../../utils/getFlagByCode';

const Profile = ({ setIsAuth }) => {

  const name = useSelector((state) => state.users.name);
  const lastname = useSelector((state) => state.users.lastname);
  const description = useSelector((state) => state.users.description);
  const age = useSelector((state) => state.users.age);
  const isVip = useSelector((state) => state.users.isVip);

  const localStorageUID = localStorage.getItem('uid');
  const user = useSelector((state) => state.users);
  const language = localStorage.getItem('language');
  const languageRead = localStorage.getItem('languageRead');
  const uid = useSelector((state) => state.users.uid);
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
      .post(`${API_URL}/user`, { uid: params.uid })
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

  if (localStorage.getItem("uid") === params.uid)
    return (
      <div className={style.profileMainDiv}>
        <Navbar setIsAuth={setIsAuth} />
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
                {!isVip && <p className={style.profileDescription3}>Your languages are { getFlagByCode(language) } and { getFlagByCode(languageRead) } . To be able to change it, you need to be a Premium<img src={verify} className={style.iconVerify}/> user</p>}
              </div>

              {
                isVip && (
                <FormControl>
                <label htmlFor="language">Your selected language:</label>
                <select
                  name="language"
                  defaultValue={language}
                  onChange={(e) => {
                    updateUserLanguage({ uid: localStorageUID, language: e.target.value })
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                  }}
                >
                  <option value={'es'}>Spanish 🇪🇸</option>
                  <option value={'en'}>English 🇬🇧</option>
                  <option value={'fr'}>French 🇫🇷</option>
                  <option value={'it'}>Italian 🇮🇹</option>
                  <option value={'de'}>German 🇩🇪</option>
                  <option value={'nl'}>Dutch (Holland) 🇳🇱</option>
                  <option value={'pt'}>Portuguese 🇵🇹</option>
                  <option value={'ru'}>Russian 🇷🇺</option>
                  <option value={'zh'}>Chinese (Simplified) 🇨🇳</option>
                  <option value={'zh-TW'}>Chinese (Traditional) 🇨🇳</option>
                  <option value={'ko'}>Korean 🇰🇷</option>
                  <option value={'gn'}>Guarani 🇵🇾</option>
                  <option value={'id'}>Indonesian 🇮🇩</option>
                </select>

                <label htmlFor="languageRead" style={{ marginTop: "50px" }}>Your reading language:</label>
                <select
                  name="languageRead"
                  defaultValue={languageRead}
                  onChange={(e) => {
                    updateUserReadLanguage({ uid: localStorageUID, languageRead: e.target.value })
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                  }}
                >
                  <option value={'es'}>Spanish 🇪🇸</option>
                  <option value={'en'}>English 🇬🇧</option>
                  <option value={'fr'}>French 🇫🇷</option>
                  <option value={'it'}>Italian 🇮🇹</option>
                  <option value={'de'}>German 🇩🇪</option>
                  <option value={'nl'}>Dutch (Holland) 🇳🇱</option>
                  <option value={'pt'}>Portuguese 🇵🇹</option>
                  <option value={'ru'}>Russian 🇷🇺</option>
                  <option value={'zh'}>Chinese (Simplified) 🇨🇳</option>
                  <option value={'zh-TW'}>Chinese (Traditional) 🇨🇳</option>
                  <option value={'ko'}>Korean 🇰🇷</option>
                  <option value={'gn'}>Guarani 🇵🇾</option>
                  <option value={'id'}>Indonesian 🇮🇩</option>
                </select>
              </FormControl>
                )
                
              }

              
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
      <Navbar setIsAuth={setIsAuth} />
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
