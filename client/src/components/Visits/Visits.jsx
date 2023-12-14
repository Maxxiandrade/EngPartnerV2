
import styles from './Visits.module.css'

import { postUserVisiting,getVisitors } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Visits = ({visitedUid})=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const uid = useSelector(state=> state.users.uid)
    console.log(uid)
    const name = useSelector(state=> state.users.name)
    const lastname = useSelector(state=> state.users.lastname)
    const sex = useSelector(state=> state.users.sex)
    const country = useSelector(state=> state.users.country)
    const age = useSelector(state=> state.users.age)
    const photo = useSelector(state=> state.users.photo)
    const userVisited = visitedUid
    const isVip = useSelector(state=> state.users.isVip)
    const visitors = useSelector(state=> state.users.visitingUsers)

    

    const handleGoToVip = ()=>{
      navigate('/premium')
    }

    const handlePostUserVisit = ()=>{
        const userData = {
            user: userVisited,
            visitingUserData: {
                name: name,
                lastname: lastname,
                sex: sex,
                age: age,
                country: country,
                photo: photo,
                uid: uid,
            }
        }
        console.log(userData)
        dispatch(postUserVisiting(userData))
    }

    useEffect(() => {
        if (uid && name && lastname && sex && country && age && photo && userVisited) {
            handlePostUserVisit();
        } 
    }, [uid, name, lastname, sex, country, age, photo]);

    useEffect(() => {
        if(uid){
            dispatch(getVisitors(uid))
        }
    }, [uid]);

    
    

    if (!userVisited && isVip === true) {
        return (
          <div className={styles.visitorsContainer}>
            <p className={styles.visitors}>Visitors</p>
            {visitors.map(visitant => (
              <div className={styles.visitantContainer} key={visitant.uid}>
                <Link to={`/profile/${visitant.uid}`}>
                  {console.log(visitant.uid)}
                <div className={styles.imgContainer}>
                    <img src={visitant.photo} alt={visitant.name} />
                </div>
                </Link>
                
                <div className={styles.textContainer}>
                <div className={styles.nameDiv}>
                <p>{visitant.name}</p>
                <p>{visitant.lastname}</p>
                </div>

                <div className={styles.secondText}>
                <p>{visitant.sex}</p>
                <p>{visitant.age}</p>
                </div>
                </div>
              </div>
            ))}
          </div>
        );
      } else if(!visitedUid){
        return <div className={styles.noVipMessageContainer}>
        <p className={styles.visitors}>Get the VIP to access your visitors</p>
        <button onClick={handleGoToVip} className={styles.buttonToVip}>Get it now</button>
      </div>; 
      }
}

export default Visits