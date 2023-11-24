import style from './Profile.module.css';

//Tools
import { auth } from "../../firebase-config";
import { useState } from "react";
import { Link } from "react-router-dom";


const Profile = ()=>{

    

    const [profile, setProfile] = useState({
        name: undefined,
        lastname: undefined,
        age: undefined,
        sex: undefined,
        country: undefined,
        photo: undefined,
        description: undefined
    })

    const user = {
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL
    };

    const handleData = (e)=>{

    };

    return(
        <>
        <Link to='/home'>
            <button>Home</button>
        </Link>
        <br />
        <img src={user.photo} alt="Profile pic" className={style.photo}/>
        <h1>{user.name}</h1>
        <h2>{profile.sex}</h2>
     
        </>
    )
};

export default Profile;