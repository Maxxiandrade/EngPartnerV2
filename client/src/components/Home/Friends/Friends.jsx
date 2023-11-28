import { useEffect } from "react";
import { getFriends, getOnline } from "../../../redux/actions/actions";
import {useSelector, useDispatch } from "react-redux";
import style from './Friends.module.css'


const Friends = ()=>{
    const dispatch = useDispatch();
    const friends = useSelector((state)=>state.users.friends)
    useEffect(() => {
      const uid = localStorage.getItem("uid")
      if(uid){
      dispatch(getFriends(uid));}
      console.log(friends);
    }, [dispatch]);
    
  
    return(
        <div className={style.friendContainer}>
            <h1 className={style.txt}>Friends:</h1>
            {friends.map((friend)=>(
                <>
                
                <p className={style.txt} key={friend.uid}> 
                    <img src={friend.photo} alt="" className={style.photo}/>
                    {friend.user} 
                    {friend.isOn ? <span> 🟢 </span> : <span> 🔴</span> }</p>
                </>
            )
            )}
        </div>
    )
}

export default Friends