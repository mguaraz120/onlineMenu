import express from 'express'
const router = express.Router()
import { 
    getDishById, 
    getDishes, 
    deleteDish, 
    updateDish, 
    createDish, 
    createDishReview, 
    getTopDishes
} from '../controllers/dishController.js'
import { protect, admin } from '../middleware/authMiddleware.js'



router
    .route('/') 
    .get(getDishes)
    .post(protect, admin, createDish)
router.route('/:id/reviews').post(protect, createDishReview)
router.get('/top', getTopDishes)
router
    .route('/:id')
    .get(getDishById)
    .delete(protect, admin, deleteDish)
    .put(protect, admin, updateDish)

export default router
