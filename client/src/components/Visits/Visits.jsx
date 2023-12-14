
import styles from './Visits.module.css'
import astronautPcLike from '../../assets/astronaut/astronautPcLike.jpg'
import astronautStand from '../../assets/astronaut/astronautStand.jpg'
import verify from '../../assets/svg/verify.svg'


import { postUserVisiting, getVisitors } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Visits = ({ visitedUid }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const uid = useSelector(state => state.users.uid)
  console.log(uid)
  const name = useSelector(state => state.users.name)
  const lastname = useSelector(state => state.users.lastname)
  const sex = useSelector(state => state.users.sex)
  const country = useSelector(state => state.users.country)
  const age = useSelector(state => state.users.age)
  const photo = useSelector(state => state.users.photo)
  const userVisited = visitedUid
  const isVip = useSelector(state => state.users.isVip)
  const visitors = useSelector(state => state.users.visitingUsers)



  const handleGoToVip = () => {
    navigate('/premium')
  }

  const handlePostUserVisit = () => {
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
    if (uid) {
      dispatch(getVisitors(uid))
    }
  }, [uid]);




  if (!userVisited && isVip === true) {
    return (
      <div className={styles.visitsMainDiv}>
        <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className={styles.visitors}>Profile views:</p>
          <div className={styles.visitorsContainer}>
            {visitors.map(visitant => (
              <Link to={`/profile/${visitant.uid}`}>
                <div className={styles.visitantContainer} key={visitant.uid}>
                  <div className={styles.imgContainer}>
                    <img src={visitant.photo} alt={visitant.name} />
                  </div>
                  <div className={styles.nameDiv}>
                    <p>{visitant.name}</p>
                    <p>{visitant.lastname}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {visitors[0] ? <img src={astronautPcLike} alt="" style={{ width: '300px' }} />:""}
      </div>
    );
  } else if (!visitedUid) {
    return <div className={styles.noVipMessageContainer}>
      <div>
      <p className={styles.visitors}>
        Profile views: {visitors.length}
      </p>
      <p style={{textAlign:'center'}}>
        Access this list with VIP <img src={verify} className={styles.iconVerify} />
      </p>
      <img src={astronautStand} alt="" style={{ width: '300px' }} />
      </div>

    </div>;
  }
}

export default Visits