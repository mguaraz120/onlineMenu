import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Dish from '../components/Dish'
import axios from 'axios'


const HomeScreen = () => {
    const [dishes, setDishes] = useState([])

    useEffect(() => {
    const fetchDishes = async () => {
        const { data } = await axios.get('/api/dishes')

        setDishes(data)
    }
        fetchDishes()
    }, [])

    return (
        <>
            <h1>Best Dishes</h1>
            <Row>
                {dishes.map(dish => (
                    <Col key={dish._id} sm={12} md={6} lg={4} xl={3}>
                    <Dish dish={dish}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
