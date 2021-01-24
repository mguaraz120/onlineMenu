import axios from 'axios'

import {  
    DISH_LIST_REQUEST, 
    DISH_LIST_SUCCESS, 
    DISH_LIST_FAIL, 
    // DISH_DETAILS_REQUEST,
    // DISH_DETAILS_SUCCESS,
    // DISH_DETAILS_FAIL
} from '../constants/dishConstants'


export const listDishes = () => async(dispatch) => {
    try {
        dispatch({ type: DISH_LIST_REQUEST })

        const { data } = await axios.get('/api/dishes')

        dispatch({
            type: DISH_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DISH_LIST_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message

        })
    }
}

// export const listDishDetails = (id) => async(dispatch) => {
//     try {
//         dispatch({ type: DISH_DETAILS_REQUEST })

//         const { data } = await axios.get(`/api/dishes/${id}`)

//         dispatch({
//             type: DISH_DETAILS_SUCCESS,
//             payload: data
//         })
//     } catch (error) {
//         dispatch({
//             type: DISH_DETAILS_FAIL,
//             payload: error.response && error.response.data.message 
//                 ? error.response.data.message
//                 : error.message

//         })
//     }
// }