
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

    useEffect(() => {
        if(uid){
            dispatch(getVisitors(uid)); // Llama a getVisitors al montar el componente o cuando cambie uid
        }
    }, [uid]);

    
    return(
        <div>
            <p>Visitors</p>
            {visitors.map(visitant => (
      <div key={visitant.uid}> {/* Asegúrate de tener una propiedad única como key, aquí se usa uid */}
        <p>Name: {visitant.name}</p>
        <p>Lastname: {visitant.lastname}</p>
        <p>Sex: {visitant.sex}</p>
        <p>Age: {visitant.age}</p>
        <p>Country: {visitant.country}</p>
      </div>
    ))}
        </div>
    )
}

export default Visits