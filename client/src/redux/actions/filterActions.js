import { FILTER_BY_MALE,
FILTER_BY_BOTH,
FILTER_BY_FEMALE,
FILTER_BY_VIP,
RESET_FILTERS,
FILTER_BY_AGE,
FILTER_BY_COUNTRY
} from "../action_types/filterActionTypes";

export const filterByMale = () => ({
    type: FILTER_BY_MALE,
  });
  
  export const filterByBoth = () => ({
    type: FILTER_BY_BOTH,
  });
  
  export const filterByFemale = () => ({
    type: FILTER_BY_FEMALE,
  });

export const filterByVip = ()=>{
    return {
        type: FILTER_BY_VIP,
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