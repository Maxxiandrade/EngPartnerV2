import { useState } from "react";
import styles from './RateCard.module.css'
import { useDispatch, useSelector } from "react-redux";


import { rated } from "../../redux/actions/actions";

const RateCard = ()=>{
    const dispatch = useDispatch()
    const uid = useSelector(state=> state.users.uid)
    const [currentRating, setCurrentRating] = useState(0)
    const stars = [1,2,3,4,5]

    const handleRating = (value)=>{
        setCurrentRating(value)
        console.log(currentRating)
    }

    const onSubmitRate = (currentRating) => {
        dispatch(rated(currentRating))
    }
    return (
        <form className={styles.mainCard}>
          <p>Valoración actual: {currentRating}</p>
          <div>
            {stars.map((value) => (
              <span className={styles.numberValues} key={value} onClick={() => handleRating(value)}>
                {value}
              </span>
            ))}
          </div>
          <button onSubmit={onSubmitRate}>send</button>
        </form>
      );
}

export default RateCard