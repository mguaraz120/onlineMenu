import express from 'express'
const router = express.Router()
import { getDishById, getDishes, deleteDish } from '../controllers/dishController.js'
import { protect, admin } from '../middleware/authMiddleware.js'



router.route('/').get(getDishes)

router
    .route('/:id')
    .get(getDishById)
    .delete(protect, admin, deleteDish)

export default router
