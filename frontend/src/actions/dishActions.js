import axios from 'axios'

import {  
    DISH_LIST_REQUEST, 
    DISH_LIST_SUCCESS, 
    DISH_LIST_FAIL, 
    DISH_DETAILS_REQUEST,
    DISH_DETAILS_SUCCESS,
    DISH_DETAILS_FAIL,
    DISH_DELETE_REQUEST,
    DISH_DELETE_SUCCESS,
    DISH_DELETE_FAIL
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

export const listDishDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: DISH_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/dishes/${id}`)

        dispatch({
            type: DISH_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DISH_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message

        })
    }
}

export const deleteDish = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DISH_DELETE_REQUEST
        })

        const { userLogin: { userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/dishes/${id}`, config)
        dispatch({
            type: DISH_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: DISH_DELETE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message

        })
    }
}