import style from "./Profile.module.css";
import logo from "../../assets/logo-EngPartner.png"

//Tools
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const params = useParams();

  const [profile, setProfile] = useState();

  useEffect(() => {
    axios
      .post(`http://localhost:3001/user`, { uid: params.uid })
      .then(({ data }) => {
        if (data) {
          setProfile(data);
        }
      });
  }, [params?.uid]);

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
