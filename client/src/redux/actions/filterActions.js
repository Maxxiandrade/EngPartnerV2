import { FILTER_BY_SEX,
FILTER_BY_VIP,
RESET_FILTERS,
FILTER_BY_AGE,
FILTER_BY_COUNTRY
} from "../action_types/filterActionTypes";

export const filterBySex = (sex)=>{
    return {
        type: FILTER_BY_SEX,
        payload:sex
    }
} 

export const filterByVip = (vip)=>{
    return {
        type: FILTER_BY_VIP,
        payload: vip
    }
}

export const filterByAge = (age)=>{
    return{
        type: FILTER_BY_AGE,
        payload: age
    }
}

export const filterByCountry = (country)=>{
    return {
        type: FILTER_BY_COUNTRY,
        payload: country
    }
}

export const resetFilters = () => ({
    type: RESET_FILTERS
});