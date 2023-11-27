import style from "./Profile.module.css";
import logo from "../../assets/logo-EngPartner.png"

//Tools
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../redux/actions/actions";
import { auth } from "../../firebase-config";

const Profile = () => {
  const user = useSelector((state)=>state.users)
  const dispatch = useDispatch();
  const params = useParams();
  const [edit, setEdit] = useState(false)
  const [aux, setAux] = useState(false)
  const [profile, setProfile] = useState();
  const [changes, setChanges] = useState({
    uid: params.uid,
    name:"",
    lastname: "",
    description:""
  });

  useEffect(() => {
    axios
      .post(`http://localhost:3001/user`, { uid: params.uid })
      .then(({ data }) => {
        if (data) {
          setProfile(data);
        }
      });
  }, [params?.uid]);


  const handleEdit = ()=>{
    if(!aux){
    setEdit(true)}
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChanges({
      ...changes,
      [name]: value, 
    });
  };
  
  const finishEdit = ()=>{
    dispatch(editUser(changes))
    setEdit(false)
  }



  if(user.uid === params.uid) return (
    <div className={style.profileMainDiv}>
      <nav className={style.profileNav}>
        <Link to="/home">
          <button className={style.homeBtn}><img src={logo} alt="Home" className={style.logo} /></button>
        </Link>
      </nav>
      {profile && (
        <div className={style.profileContainer}>
         
          <img src={profile.photo} alt="Profile" className={style.profilePhoto} />
          <div className={style.profileInfo}>
          <button onClick={handleEdit}>Edit</button>
          <h1>hola</h1>
          <h1 className={style.profileName}>{profile.name} {profile.lastname} ({profile.age})</h1>
            <br />
            <h3 className={style.profileCountry}>{profile.country}</h3>
            <h3 className={style.profileSex}>{profile.sex}</h3>
            <p className={style.profileDescription}>Description: {profile.description}</p>
          {edit && <><button onClick={finishEdit}>Done</button>
          <div>
             <h1>Edit Mode</h1>
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
            /></div></>}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={style.profileMainDiv}>
      <nav className={style.profileNav}>
        <Link to="/home">
          <button className={style.homeBtn}><img src={logo} alt="Home" className={style.logo} /></button>
        </Link>
      </nav>
      {profile && (
        <div className={style.profileContainer}>
          <img src={profile.photo} alt="Profile" className={style.profilePhoto} />
          <div className={style.profileInfo}>
          
            <h1 className={style.profileName}>{profile.name} {profile.lastname} ({profile.age})</h1>
            <br />
            <h3 className={style.profileCountry}>{profile.country}</h3>
            <h3 className={style.profileSex}>{profile.sex}</h3>
            <p className={style.profileDescription}>Description: {profile.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
