import { FILTER_BY_SEX,
FILTER_BY_VIP,
RESET_FILTERS,
FILTER_BY_AGE
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

export const resetFilters = () => ({
    type: RESET_FILTERS
});