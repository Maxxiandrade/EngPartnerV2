import { GET_ALL_COUNTRIES,
} from "../action_types/countriesActionTypes";

import axios from 'axios'

export const getAllCountries = ()=> async (dispatch)=>{
    try {
        const response = await axios("http://localhost:3001/getcountries")
        const countriesData = response.data
        // console.log(countriesData)

        dispatch({
            type: GET_ALL_COUNTRIES,
            payload: countriesData
        })
    } catch (error) {
        window.alert(error)
    }
}