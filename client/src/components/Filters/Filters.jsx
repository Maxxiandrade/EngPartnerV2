import { useDispatch, useSelector } from "react-redux";

import { filterBySex, filterByVip, resetFilters } from "../../redux/actions/filterActions";

import styles from './Filters.module.css'
import { useState } from "react";

const Filters = ()=>{
    const dispatch = useDispatch()
    
    const [sexFilterValue, setSexFilterValue] = useState('')
    const [isVipFilterValue, setIsVipFilterValue] = useState('')

    const handleRemoveFilter = ()=>{
        dispatch(resetFilters())
    }

    const handleFilterBySex = (event)=>{
        console.log(event.target.value)
        setSexFilterValue(event.target.value)
    }

    const handleFilterByVip = (event)=>{
        console.log(event.target.value)
        setIsVipFilterValue(event.target.value)
    }

    const applyFilters = ()=>{
        if(sexFilterValue){
            dispatch(filterBySex(sexFilterValue))
        }

        if(isVipFilterValue){
            dispatch(filterByVip(isVipFilterValue))
        }

        setIsVipFilterValue("")
        setSexFilterValue("")
    }
    
    return(
        <div className={styles.filtersContainer}>
            <select onChange={handleFilterBySex} className={styles.selectStyles}>
                <option value="both">both</option>
                <option value="male">male</option>
                <option value="female">female</option>
            </select>

            <button value="vip" onClick={handleFilterByVip}>vip</button>

            <button onClick={applyFilters}>apply filters</button>
            <button onClick={handleRemoveFilter}>reset</button>
        </div>
    )
}

export default Filters