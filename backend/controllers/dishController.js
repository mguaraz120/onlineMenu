import asyncHandler from 'express-async-handler'
import Dish from '../models/dishModel.js'


// @desc Fetch all dishes
// @route GET /api/dishes
// @access Public
const getDishes = asyncHandler(async(req, res) => {
    const pageSize = 9
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword, 
            $options: 'i'
        }
    } : {}

    const count = await Dish.countDocuments({...keyword})
    const dishes = await Dish
                            .find({...keyword})
                            .limit(pageSize)
                            .skip(pageSize * (page - 1))

    res.json({dishes, page, pages: Math.ceil(count / pageSize)})
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

// @desc    Create new Review
// @route   POST /api/dishes/:id/reviews
// @access  Private
const createDishReview = asyncHandler(async(req, res) => {
  
    const {rating, comment} = req.body

    const dish = await Dish.findById(req.params.id)

    if(dish){
        const alreadyReviwed = dish.reviews
            .find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviwed){
            res.status(400)
            throw new Error('Dish already reviewed')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        dish.reviews.push(review)
        dish.numreviews = dish.reviews.length
        dish.rating = dish.reviews.reduce((acc, item) => item.rating + acc, 0)
            / dish.reviews.length

        await dish.save()
        res.status(201).json({message: 'Review added'})
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
    updateDish,
    createDishReview
}