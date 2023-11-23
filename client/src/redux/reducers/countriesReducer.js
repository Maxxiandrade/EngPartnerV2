import { GET_ALL_COUNTRIES } from "../action_types/countriesActionTypes"

const initialState = {
    countries: [],
    allCountries: [],
}

const countriesReducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
            default:
                return state
    }
  

}

export default countriesReducer