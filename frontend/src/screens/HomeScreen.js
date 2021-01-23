import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Dish from '../components/Dish'
import dishes from '../dishes'


const HomeScreen = () => {
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
