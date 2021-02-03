import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopDishes } from '../actions/dishActions'

const DishCarousel = () => {
  const dispatch = useDispatch()

  const dishTopRated = useSelector((state) => state.dishTopRated)
  const { loading, error, dishes } = dishTopRated

  useEffect(() => {
    dispatch(listTopDishes())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-light'>
      {dishes.map((dish) => (
        <Carousel.Item key={dish._id}>
          <Link to={`/dish/${dish._id}`}>
            <Image src={dish.image} alt={dish.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {dish.name} (${dish.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default DishCarousel
