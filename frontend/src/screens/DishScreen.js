import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl, FormGroup, FormLabel, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listDishDetails, createReviewDish } from '../actions/dishActions'
import {DISH_CREATE_REVIEW_RESET} from '../constants/dishConstants'

const DishScreen = ({history, match}) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const dishDetails = useSelector(state => state.dishDetails)
    const { loading, error, dish } = dishDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dishCreateReview = useSelector(state => state.dishCreateReview)
    const { error: errorDishReview, success: successDishReview } = dishCreateReview

    useEffect(() => {
        if(successDishReview) {
            alert('review Submitted')
            setRating(0)
            setComment('')
            dispatch({type: DISH_CREATE_REVIEW_RESET})
        }
        dispatch(listDishDetails(match.params.id))
        }, [dispatch, match, successDishReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createReviewDish(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>
                Add it to your tray. Not sure? GO BACK to the menu.
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
                <Meta title ={dish.name}/>
                <Row>
                    <Col md={6}>
                        <Image src={dish.image} alt={dish.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>{dish.name}</h2>
                            </ListGroupItem>

                            {/* <ListGroupItem>
                                Price: ${dish.price}
                            </ListGroupItem> */}
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

                                {dish.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <FormControl as='select' value={qty} onChange={e => setQty(e.target.value)}>
                                                    {[...Array(dish.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x+1}> {x+1} </option>
                                                    ))}
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}

                                <ListGroupItem>
                                    <Button 
                                        onClick={addToCartHandler}
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
                <Row>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        <ListGroupItem>
                                <Rating
                                    value={dish.rating} 
                                    text={`${dish.numReviews} reviews`}
                                />
                        </ListGroupItem>
                        {dish.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant='flush'>
                            {dish.reviews.map(review => (
                                <ListGroupItem key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroupItem>
                            ))}
                            <ListGroupItem>
                                <h2>Write a Review</h2>
                                {errorDishReview && <Message variant='danger'>{errorDishReview}</Message>}
                                {userInfo ? 
                                (<Form onSubmit={submitHandler}>
                                    <FormGroup controlId='rating'>
                                        <FormLabel>Rating</FormLabel>
                                        <FormControl
                                            as='select'
                                            value={rating}
                                            onChange={e => setRating(e.target.value)}
                                        >
                                            <option value=''>Select...</option> 
                                            <option value='1'>1 - Poor</option> 
                                            <option value='2'>2 - Fair</option> 
                                            <option value='3'>3 - Good</option> 
                                            <option value='4'>4 - Very Good</option> 
                                            <option value='5'>5 - Excellent</option> 

                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup controlId='comment'>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl
                                        as='textarea'
                                        row='3'
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                    >
                                    </FormControl>
                                    </FormGroup>
                                    <Button type='submit' variant='primary'>Submit</Button>
                                </Form>) : 
                                <Message>Please <Link to='/login'>sign In</Link> to qrite a review</Message>}
                            </ListGroupItem>
                        </ListGroup>                         
                    </Col>
                </Row>
            </>
            )}
        </>
    )
}

export default DishScreen
