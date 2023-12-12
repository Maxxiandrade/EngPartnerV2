
import styles from './Visits.module.css'

import { postUserVisiting } from '../../redux/actions/actions'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Visits = ({name,lastname,sex,age,country,uid})=>{
    const dispatch = useDispatch()

    const handlePostUserVisit = ()=>{
        const userData = {
            user: uid,
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

    useEffect(()=>{
        handlePostUserVisit()
    },[])

    
    return(
        <div>
            <p>visitfhfghfghfgs</p>

        </div>
    )
}

export default Visits