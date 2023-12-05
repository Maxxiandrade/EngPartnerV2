import { useEffect } from "react";
import { getFriends } from "../../../redux/actions/actions";
import {useSelector, useDispatch } from "react-redux";
import style from './Friends.module.css'
import offline from '../../../assets/svg/offline.svg'
import online from '../../../assets/svg/online.svg'
import astronaut from '../../../assets/astronaut.png'


const Friends = () => {
    const dispatch = useDispatch();
    const friends = useSelector((state)=>state.users.friends)
    
    useEffect(() => {
      const uid = localStorage.getItem("uid")
      if(uid){
      dispatch(getFriends(uid));}
      console.log(friends);
    }, []);
    
  
    return(
        <div className={style.friendContainer}>
            <div className={style.txtH1}><h1>Friends:</h1></div>
            {friends?.length === 0 ? <p className={style.txt}>It seems to be no one around here, try connecting with someone!<img src={astronaut} alt="" className={style.astronaut}/></p> : friends?.map((friend)=>(
                <>
                    <div className={style.container} key={friend.uid}>
                        <div className={style.userName}>
                            <img src={friend?.photo} alt="" className={style.photo} />
                            {friend?.user}
                        </div>
                        <div className={style.onOff}>
                            {friend?.isOn ?
                                (<img src={online} alt='🟢' className={style.onlineOffline} />) :
                                (<img src={offline} alt='🔴' className={style.onlineOffline} />)
                            }
                        </div>
                    </div>
                </>
            )
            )}
        </div>
    )
}

export default Friends