import express from 'express'
const router = express.Router()
import { getDishById, getDishes } from '../controllers/dishController.js'

router.route('/').get(getDishes)

router.route('/:id').get(getDishById)

export default router
