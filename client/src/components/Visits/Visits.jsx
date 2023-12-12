
import styles from './Visits.module.css'

import { postUserVisiting } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const Visits = ({visitedUid})=>{
    const dispatch = useDispatch()

    const uid = useSelector(state=> state.users.uid)
    const name = useSelector(state=> state.users.name)
    const lastname = useSelector(state=> state.users.lastname)
    const sex = useSelector(state=> state.users.sex)
    const country = useSelector(state=> state.users.country)
    const age = useSelector(state=> state.users.age)
    const userVisited = visitedUid
    

    const handlePostUserVisit = ()=>{
        const userData = {
            user: userVisited,
            visitingUserData: {
                name: name,
                lastname: lastname,
                sex: sex,
                age: age,
                country: country,
                uid: uid,
            }
        }
        console.log(userData)
        dispatch(postUserVisiting(userData))
    }

    useEffect(() => {
        if (uid && name && lastname && sex && country && age && userVisited) {
            handlePostUserVisit();
        } 
    }, [uid, name, lastname, sex, country, age]);

    
    return(
        <div>
            <p>Visitors</p>

        </div>
    )
}

export default Visits