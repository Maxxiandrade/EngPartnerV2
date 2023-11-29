import { useEffect } from "react";
import { getFriends, getOnline } from "../../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import style from './Friends.module.css'
import offline from '../../../assets/svg/offline.svg'
import online from '../../../assets/svg/online.svg'


const Friends = () => {
    const dispatch = useDispatch();
    const friends = useSelector((state) => state.users.friends)
    useEffect(() => {
        const uid = localStorage.getItem("uid")
        if (uid) {
            dispatch(getFriends(uid));
        }
        console.log(friends);
    }, [dispatch]);


    return (
        <div className={style.friendContainer}>
            <div className={style.txtH1}><h1>Friends:</h1></div>
            {friends.map((friend) => (
                <>
                    <div className={style.container} key={friend.uid}>
                        <div className={style.userName}>
                            <img src={friend.photo} alt="" className={style.photo} />
                            {friend.user}
                        </div>
                        <div className={style.onOff}>
                            {friend.isOn ?
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