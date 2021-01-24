import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Dish from '../models/dishModel.js'

// @desc Fetch all dishes
// @route GET /api/dishes
// @access Public
router.get('/', asyncHandler(async(req, res) => {
    const dishes = await Dish.find({})

    res.json(dishes)
}))

// @desc Fetch single dish
// @route GET /api/dishes/:id
// @access Public
router.get('/:id', asyncHandler(async(req, res) => {
    const dish = await Dish.findById(req.params.id)

    if(dish){
        res.json(dish)
    }else{
        res.status(404)
        throw new Error('Dish not found')
    }
}))

export default router
