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

export const dishListReducer = (state = {dishes: [] }, action) => {
    switch (action.type) {
        case DISH_LIST_REQUEST:
            return { loading: true, dishes: [] }
        case DISH_LIST_SUCCESS:
            return { loading: false, dishes: action.payload }
        case DISH_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const dishDetailsReducer = (state = {dish: { reviews: [] } }, action) => {
    switch (action.type) {
        case DISH_DETAILS_REQUEST:
            return { loading: true, ...state }
        case DISH_DETAILS_SUCCESS:
            return { loading: false, dish: action.payload }
        case DISH_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const dishDeleteReducer = (state = { }, action) => {
    switch (action.type) {
        case DISH_DELETE_REQUEST:
            return { loading: true }
        case DISH_DELETE_SUCCESS:
            return { loading: false, success: true }
        case DISH_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}