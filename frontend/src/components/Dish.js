import React from 'react'
import { Card } from 'react-bootstrap'

const Dish = ({dish}) => {
    return (
        <Card className='my-3 p-3 rouded'>
            <a href={`/dish/${dish._id}`}>
                <Card.Img src={dish.image} variant='top' />
            </a>
        <Card.Body>
            <a href={`/dish/${dish._id}`}>
                <Card.Title as='div'>
                    <strong>{dish.name}</strong>
                </Card.Title>
            </a>

            <Card.Text as='div'>
                <div className='my-3'>
                    {dish.rating} from {dish.numReviews} reviews
                </div>
            </Card.Text>
            <Card.Text as='h3'>
                ${dish.price}
            </Card.Text>
        </Card.Body>
        </Card>
    )
}

export default Dish
