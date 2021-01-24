import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listDishDetails } from '../actions/dishActions'

const DishScreen = ({match}) => {
    const dispatch = useDispatch()

    const dishDetails = useSelector(state => state.dishDetails)
    const { loading, error, dish } = dishDetails

    useEffect(() => {
        dispatch(listDishDetails(match.params.id))
        }, [dispatch, match])

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Row>
                <Col md={6}>
                    <Image src={dish.image} alt={dish.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>{dish.name}</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating
                                value={dish.rating} 
                                text={`${dish.numReviews} reviews`}
                            />
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${dish.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            {dish.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${dish.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {dish.countInStock > 0 ? 'Yes, We have it' : 'Sorry, We dont have it'}
                                    </Col>
                                </Row>
                            </ListGroupItem>

                             
                                <ListGroupItem>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
    
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            

                            <ListGroupItem>
                                <Button 
                                    className='btn-block'
                                    type='button'
                                    disabled={dish.countInStock ===0}
                                >
                                    Add to your tray
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            )}
        </>
    )
}

export default DishScreen
