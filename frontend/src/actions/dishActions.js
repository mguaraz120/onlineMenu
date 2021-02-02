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
    DISH_DELETE_FAIL,
    DISH_CREATE_REQUEST,
    DISH_CREATE_SUCCESS,
    DISH_CREATE_FAIL,
    DISH_UPDATE_REQUEST,
    DISH_UPDATE_SUCCESS,
    DISH_UPDATE_FAIL,
    DISH_CREATE_REVIEW_REQUEST,
    DISH_CREATE_REVIEW_SUCCESS,
    DISH_CREATE_REVIEW_FAIL
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

export const createDish = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: DISH_CREATE_REQUEST
        })

        const { userLogin: { userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/dishes`, {}, config)
        dispatch({
            type: DISH_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DISH_CREATE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message

        })
    }
}

export const updateDish = (dish) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DISH_UPDATE_REQUEST
        })

        const { userLogin: { userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/dishes/${dish._id}`, dish, config)
        dispatch({
            type: DISH_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DISH_UPDATE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message

        })
    }
}

export const createReviewDish = (dishId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DISH_CREATE_REVIEW_REQUEST
        })

        const { userLogin: { userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/dishes/${dishId}/reviews`, review, config)
        dispatch({
            type: DISH_CREATE_REVIEW_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: DISH_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message

        })
    }
}