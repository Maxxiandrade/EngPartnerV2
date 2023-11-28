import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  filterByAge,
  filterByFemale,
  filterByMale,
  filterByBoth,
  filterByVip,
  resetFilters,
} from "../../redux/actions/filterActions";

import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();

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
    if (activeFilter !== "male") {
      setActiveFilter("male");
    } else {
      setActiveFilter(null);
    }
  };

  const handleFilterByBoth = () => {
    if (activeFilter !== "both") {
      setActiveFilter("both");
    }
  };

  const handleFilterByFemale = () => {
    if (activeFilter !== "female") {
      setActiveFilter("female");
    } else {
      setActiveFilter(null);
    }
  };

  const handleFilterByVip = () => {
    setIsVipFilterValue(!isVipFilterValue);

    console.log(isVipFilterValue);
  };

  const applyFilters = () => {
    setAreFiltersVisible(false);
    setButtonClicked(!areFiltersVisible);
    if (isVipFilterValue === true) {
      dispatch(filterByVip());
    }

    if (ageValue !== "0") {
      dispatch(filterByAge(parseInt(ageValue)));
    }

    if (activeFilter === 'male') {
      dispatch(filterByMale());
    } else if (activeFilter === 'female') {
      dispatch(filterByFemale());
    } else {
      dispatch(filterByBoth());
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
              <p>select a gender</p>

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
                onClick={handleFilterByBoth}
                style={{
                  fontWeight: activeFilter === "both" ? "bold" : "normal",
                }}
              >
                Both
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
          <button onClick={handleFilterByVip}>vip</button>
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
