import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Dish from '../components/Dish'
import { listDishes } from '../actions/dishActions'


const HomeScreen = () => {
    const dispatch = useDispatch()

    const dishList = useSelector(state => state.dishList)
    const { loading, error, dishes } = dishList

    useEffect(() => {
        dispatch(listDishes())
    }, [dispatch])

    return (
        <>
            <h1>Best Dishes</h1>
            {loading ? 
                <h2>Loading...</h2> 
                : error ? 
                <h3>{error}</h3> :             
                <Row>
                    {dishes.map(dish => (
                        <Col key={dish._id} sm={12} md={6} lg={4} xl={3}>
                        <Dish dish={dish}/>
                        </Col>
                    ))}
                </Row>}

        </>
    )
}

export default HomeScreen
