import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Dish = ({dish}) => {
    return (
        <Card className='my-3 p-3 rouded'>
            <Link to={`/dish/${dish._id}`}>
                <Card.Img src={dish.image} variant='top' />
            </Link>
        <Card.Body>
            <Link to={`/dish/${dish._id}`}>
                <Card.Title as='div'>
                    <strong>{dish.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='div'>
                <Rating value={dish.rating} text={`${dish.numReviews} reviews`}/>
            </Card.Text>
            <Card.Text as='h3'>
                ${dish.price}
            </Card.Text>
        </Card.Body>
        </Card>
    )
}

export default Dish
