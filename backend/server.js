import express from 'express'
import dishes from './data/dishes.js'
import dotenv from'dotenv'
// import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// import connectDB from './config/db.js'

// import dishRoutes from './routes/dishRoutes.js'

dotenv.config()

// connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running')
})
app.get('/api/dishes', (req, res) => {
    res.json(dishes)
})
app.get('/api/dishes/:id', (req, res) => {
    const dish = dishes.find(d => d._id === req.params.id)
    res.json(dish)
})

// app.use('/api/dishes', dishRoutes)

// app.use(notFound)

// app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))