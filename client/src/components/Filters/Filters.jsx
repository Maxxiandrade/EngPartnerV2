import { useDispatch, useSelector } from "react-redux";

import {
  filterByAge,
  filterBySex,
  filterByVip,
  resetFilters,
} from "../../redux/actions/filterActions";


import styles from "./Filters.module.css";
import { useState,} from "react";


const Filters = () => {
  const dispatch = useDispatch();

  const [sexFilterValue, setSexFilterValue] = useState("");
  const [isVipFilterValue, setIsVipFilterValue] = useState(false);
  const [ageValue, setAgeValue] = useState("0"); 

  const handleRemoveFilter = () => {
    dispatch(resetFilters());
  };

  const handleFilterByAge = (event) => {
    const value = event.target.value;
    setAgeValue(value.toString()); 
  };

  const handleFilterBySex = (event) => {
    setSexFilterValue(event.target.value);
  };

  const handleFilterByVip = () => {
    setIsVipFilterValue(!isVipFilterValue);
    
    console.log(isVipFilterValue)
  };

  const applyFilters = () => {
    if (sexFilterValue) {
      dispatch(filterBySex(sexFilterValue));
    }

    if (isVipFilterValue === true) {
      dispatch(filterByVip());
    }

    if (ageValue !== "0") {
      dispatch(filterByAge(parseInt(ageValue)));
    }

    setIsVipFilterValue(false);
    setSexFilterValue("");
    setAgeValue("0");
  };

  return (
    <div className={styles.filtersContainer}>
      <select onChange={handleFilterBySex} className={styles.selectStyles}>
        <option value="both">both</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>

      <input
        type="range"
        min="18"
        max="100"
        value={ageValue}
        onChange={handleFilterByAge}
      />
      <span>{ageValue}</span>
      <button onClick={handleFilterByVip}>vip</button>

      <button onClick={handleRemoveFilter}>reset</button>
      <button onClick={applyFilters}>apply filters</button>
    </div>
  );
};

export default Filters;
