
import styles from './Visits.module.css'

import { postUserVisiting,getVisitors } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const Visits = ({visitedUid})=>{
    const dispatch = useDispatch()

    const uid = useSelector(state=> state.users.uid)
    console.log(uid)
    const name = useSelector(state=> state.users.name)
    const lastname = useSelector(state=> state.users.lastname)
    const sex = useSelector(state=> state.users.sex)
    const country = useSelector(state=> state.users.country)
    const age = useSelector(state=> state.users.age)
    const photo = useSelector(state=> state.users.photo)
    const userVisited = visitedUid

    const visitors = useSelector(state=> state.users.visitingUsers)
    // console.log(visitors)

    

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

    
    if (!userVisited) {
        return (
          <div>
            <p>Visitors</p>
            {visitors.map(visitant => (
              <div key={visitant.uid}>
                <div className="imgContainer">
                    <img src={visitant.photo} alt="" />
                </div>
                <p>{visitant.name}</p>
              </div>
            ))}
          </div>
        );
      } else {
        return null; 
      }
}

export default Visits