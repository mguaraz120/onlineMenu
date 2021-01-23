import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const DishScreen = ({match}) => {
    const [dish, setDish] = useState({})

    useEffect(() => {
        const fetchDish = async () => {
            const { data } = await axios.get(`/api/dishes/${match.params.id}`)
    
            setDish(data)
        }
            fetchDish()
        }, [match])

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
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
        </>
    )
}

export default DishScreen
