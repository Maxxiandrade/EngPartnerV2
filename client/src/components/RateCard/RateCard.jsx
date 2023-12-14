import { useState } from "react";
import styles from './RateCard.module.css'
import { useDispatch, useSelector } from "react-redux";


import { rated, getMyUser } from "../../redux/actions/actions";
const RateCard = () => {
  const dispatch = useDispatch();
  const uid = useSelector(state => state.users.uid);
  const [currentRating, setCurrentRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  const [style, setStyle] = useState(true);

  const handleRating = value => {
    setCurrentRating(value);
    console.log(currentRating);
  };

  const onSubmitRate = event => {
    event.preventDefault();
    const userRated = {
      rating: currentRating,
      uid: uid
    };
    console.log(userRated);
    dispatch(rated(userRated));
    setTimeout(() => {
      dispatch(getMyUser(uid))
      
    }, 500);
    setStyle(false); // Cambia el estado para ocultar el formulario después de enviarlo
  };

  return (
    <form onSubmit={onSubmitRate} className={style ? styles.mainCard : styles.mainCardOff}>
      <p>Your rate: {currentRating}</p>
      <div className={styles.starsContainer}>
        {stars.map(value => (
          <span value={value} className={styles.numberValues} key={value} onClick={() => handleRating(value)}>
            ⭐️
          </span>
        ))}
      </div>
      <button className={styles.submitRate} type="submit">
        send
      </button>
    </form>
  );
};

export default RateCard;