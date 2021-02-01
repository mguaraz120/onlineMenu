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

// @desc    delete a dish
// @route   DELETE /api/dishes/:id
// @access  Private/Admin
const deleteDish = asyncHandler(async(req, res) => {
    const dish = await Dish.findById(req.params.id)

    if(dish){
        await dish.remove()
        res.json({ message: 'Dish removed' })
    }else{
        res.status(404)
        throw new Error('Dish not found')
    }
})

// @desc    create a dish
// @route   POST /api/dishes
// @access  Private/Admin
const createDish = asyncHandler(async(req, res) => {
    const dish = new Dish({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numreviews: 0,
        description: 'Sample description',
    })

    const createdDish = await dish.save()
    res.status(201).json(createdDish)
})

// @desc    update a dish
// @route   PUT /api/dishes/:id
// @access  Private/Admin
const updateDish = asyncHandler(async(req, res) => {
  
    const {
        name, 
        price, 
        description, 
        image,
        brand,
        category, 
        countInStock
    } = req.body

    const dish = await Dish.findById(req.params.id)

    if(dish){
        dish.name = name
        dish.price = price
        dish.description = description
        dish.image = image
        dish.brand = brand
        dish.category = category
        dish.countInStock = countInStock

        const updatedDish = await dish.save()
        res.json(updatedDish)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }


})

export {
    getDishes, 
    getDishById,
    deleteDish,
    createDish,
    updateDish
}