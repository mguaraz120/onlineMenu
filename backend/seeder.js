import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import dishes from './data/dishes.js'
import User from './models/userModel.js'
import Dish from './models/dishModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
       await Order.deleteMany()
       await Dish.deleteMany()
       await User.deleteMany()

       const createdUsers = await User.insertMany(users)

       const adminUser = createdUsers[0]._id

       const sampleDishes = dishes.map(dish => {
           return { ...dish, user: adminUser}
       })

       await Dish.insertMany(sampleDishes)

       console.log('data imported')
       process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
       await Order.deleteMany()
       await Dish.deleteMany()
       await User.deleteMany()

       console.log('data destroyed')
       process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}