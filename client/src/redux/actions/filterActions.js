import { FILTER_BY_SEX,
FILTER_BY_VIP,
RESET_FILTERS
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

export const resetFilters = () => ({
    type: RESET_FILTERS
});