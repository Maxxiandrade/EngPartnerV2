import { useEffect } from "react";
import { getFriends } from "../../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import style from './Friends.module.css'
import offline from '../../../assets/svg/offline.svg'
import online from '../../../assets/svg/online.svg'
import astronaut from '../../../assets/astronaut.png'
import { Link } from "react-router-dom";


const Friends = ( {friends} ) => {
  
    return(
        <div className={style.friendContainer}>
            <div className={style.txtH1}><h1>Friends:</h1></div>
            {friends?.length === 0 ? <p className={style.txt}>It seems to be no one around here, try connecting with someone!<img src={astronaut} alt="" className={style.astronaut} /></p> : friends?.map((friend) => (
                <>
                    <div className={style.container} key={friend.uid}>
                        <Link to={`/profile/${friend.id}`}>
                            <div className={style.userName}>
                                <img src={friend?.photo} alt="" className={style.photo} />
                                {friend?.user}
                            </div>
                        </Link>
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