import style from './Profile.module.css';

//Tools
import { auth } from "../../firebase-config";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';


const Profile = ()=>{

    const params = useParams();

    const [profile, setProfile] = useState()


    useEffect(()=>{
        axios.post(`http://localhost:3001/user`,{ uid: params.uid }).then(({data})=>{
            console.log(data);
            if(data){
                setProfile(data)
            }
        })
    },[params?.uid])

    return(
       <div>
        <Link to='/home'><button>Home</button></Link>
        <br />
        {profile && (
            <>
            {profile.photo && <img src={profile.photo}></img> }
            {profile.name && <h1>{profile.name}</h1>}
            {profile.lastname && <h1>{profile.lastname}</h1>}
            {profile.age && <h2>{profile.age}</h2>}
            {profile.sex && <h3>{profile.sex}</h3>}
            {profile.country && <h3>{profile.country}</h3>}
            {profile.description && <p>{profile.description}</p>}
            </>
        )}
       </div>
    )
};

export default Profile;