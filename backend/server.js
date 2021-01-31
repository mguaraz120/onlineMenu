import express from 'express'
import dotenv from'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import dishRoutes from './routes/dishRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/dishes', dishRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => 
res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))