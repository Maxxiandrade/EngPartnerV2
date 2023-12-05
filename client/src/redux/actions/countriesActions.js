import { GET_ALL_COUNTRIES,
} from "../action_types/countriesActionTypes";
import { API_URL } from "../../firebase-config";

import axios from 'axios'

export const getAllCountries = ()=> async (dispatch)=>{
    try {
        const response = await axios(`${API_URL}/getcountries`)
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