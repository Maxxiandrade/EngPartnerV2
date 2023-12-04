import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  filterByAge,
  filterByFemale,
  filterByMale,
  filterByVip,
  resetFilters,
} from "../../redux/actions/filterActions";

import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  console.log(users)

  // const [sexFilterValue, setSexFilterValue] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [isVipFilterValue, setIsVipFilterValue] = useState(false);
  const [ageValue, setAgeValue] = useState("0");

  const [areFiltersVisible, setAreFiltersVisible] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    handleResize()
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleFiltersVisibility = () => {
    setAreFiltersVisible(!areFiltersVisible);
    setButtonClicked(true);
    console.log(buttonClicked);
  };

  const handleRemoveFilter = () => {
    setAreFiltersVisible(false);
    setButtonClicked(!areFiltersVisible);
    dispatch(resetFilters());
  };

  const handleFilterByAge = (event) => {
    const value = event.target.value;
    setAgeValue(value.toString());
  };

  const handleFilterByMale = () => {
    setActiveFilter("male")
  };


  const handleFilterByFemale = () => {
    setActiveFilter("female")
  };

  const handleFilterByVip = () => {
    setIsVipFilterValue(!isVipFilterValue);

    // console.log(isVipFilterValue);
  };

  const applyFilters = () => {
    setAreFiltersVisible(false);
    setButtonClicked(!areFiltersVisible);
    
    if(ageValue !== "0"){
      dispatch(filterByAge(+ageValue))
    }
    if(isVipFilterValue){
      dispatch(filterByVip())
    }


    if(activeFilter === "male"){
      dispatch(filterByMale(activeFilter))
      if (isVipFilterValue === true) {
        dispatch(filterByVip())
      }
      if (ageValue !== "0") {
        dispatch(filterByAge(+ageValue));
      } 
      setActiveFilter(null)
    }

    if(activeFilter === "female"){
      dispatch(filterByFemale(activeFilter))
      if (isVipFilterValue === true) {
        dispatch(filterByVip())
      }
      if (ageValue !== "0") {
        dispatch(filterByAge(+ageValue));
      } 
      setActiveFilter(null)

    }
    
     


    setIsVipFilterValue(false);
    setAgeValue("0");
  };

  return (
    <>
      {showButton && (
        <button
          className={styles.toggleFiltersBtn}
          onClick={toggleFiltersVisibility}
        >
          Filters
        </button>
      )}

      <div
        className={`${styles.filtersContainer} ${
          areFiltersVisible ? styles.filtersVisible : ""
        }`}
      >
        <div className={styles.filtersStylesContainer}>
            <div className={styles.sexBtnsContainer}>
              <p>Select a gender</p>

              <div className={styles.buttonsSexContainer}>
              <button
              className={styles.sexBtns}
                onClick={handleFilterByMale}
                style={{
                  fontWeight: activeFilter === "male" ? "bold" : "normal",
                }}
              >
                Male
              </button>

              <button className={styles.sexBtns}
                onClick={handleFilterByFemale}
                style={{
                  fontWeight: activeFilter === "female" ? "bold" : "normal",
                }}
              >
                Female
              </button>

              </div>
              
            </div>
            <div className={styles.sexAndAgeFilterContainer}>

            <input 
              type="range"
              min="18"
              max="100"
              value={ageValue}
              onChange={handleFilterByAge}
            />
            <span>{ageValue}</span>
          <button onClick={handleFilterByVip}
          className={`${styles.vipButton} ${isVipFilterValue ? styles.vipActive : ''}`}>vip</button>
          </div>


          <div className={styles.resetAndApplyBtnsContainer}>
            <button onClick={handleRemoveFilter}>reset</button>
            <button onClick={applyFilters}>Search</button>
          </div>

          {showButton && (
      <button
        className={styles.filtersOutBtn}
        onClick={toggleFiltersVisibility}
      >
        X
      </button>
    )}
        </div>
      </div>
    </>
  );
};

export default Filters;
