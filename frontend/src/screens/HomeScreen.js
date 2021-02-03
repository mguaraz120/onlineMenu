import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Dish from '../components/Dish'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import { listDishes } from '../actions/dishActions'
import DishCarousel from '../components/DishCarousel'


const HomeScreen = ({match}) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const dishList = useSelector(state => state.dishList)
    const { loading, error, dishes, page, pages } = dishList

    useEffect(() => {
        dispatch(listDishes(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            {!keyword && <DishCarousel />}
            <h1>Best Dishes</h1>
            {loading ? 
                <Loader />
                : error ? 
                <Message variant='danger'>{error}</Message> : 
                <>            
                    <Row>
                        {dishes.map(dish => (
                            <Col key={dish._id} sm={12} md={6} lg={4} xl={3}>
                            <Dish dish={dish}/>
                            </Col>
                        ))}
                    </Row>
                    <Paginate 
                        pages={pages} 
                        page={page} 
                        keyword={keyword ? keyword : ''}
                    />
                </>
            }
        </>
    )
}

export default HomeScreen
