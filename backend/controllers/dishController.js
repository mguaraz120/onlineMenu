import asyncHandler from 'express-async-handler'
import Dish from '../models/dishModel.js'


// @desc Fetch all dishes
// @route GET /api/dishes
// @access Public
const getDishes = asyncHandler(async(req, res) => {
    const dishes = await Dish.find({})

    res.json(dishes)
})

// @desc Fetch single dish
// @route GET /api/dishes/:id
// @access Public
const getDishById = asyncHandler(async(req, res) => {
    const dish = await Dish.findById(req.params.id)

    if(dish){
        res.json(dish)
    }else{
        res.status(404)
        throw new Error('Dish not found')
    }
})

export {
    getDishes, getDishById
}