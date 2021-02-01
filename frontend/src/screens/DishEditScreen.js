import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listDishDetails, updateDish } from '../actions/dishActions'
import { DISH_UPDATE_RESET } from '../constants/dishConstants'


const DishEditScreen = ({ match, history }) => {
    const dishId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const dishDetails = useSelector(state => state.dishDetails)
    const { loading, error, dish } = dishDetails

    const dishUpdate = useSelector(state => state.dishUpdate)
    const { 
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdate } = dishUpdate
  
    useEffect(() => {
        if(successUpdate){
            dispatch({type: DISH_UPDATE_RESET})
            history.push('/admin/dishlist')
        } else {
            if(!dish.name || dish._id !==dishId) {
                dispatch(listDishDetails(dishId))
            } else {
                setName(dish.name)
                setPrice(dish.price)
                setImage(dish.image)
                setBrand(dish.brand)
                setCategory(dish.category)
                setCountInStock(dish.countInStock)
                setDescription(dish.description)
            }
        }     
    }, [dispatch, dish, dishId, history, successUpdate])

    const submitHandler = e => {
        e.preventDefault()
        dispatch(updateDish({
            _id: dishId,
            name, 
            price,
            image,
            brand, 
            category,
            countInStock,
            description
        }))
    }
    
    return (
        <>
            <Link to='/admin/dishlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
            <h1>edit Dish</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error 
            ? 
            <Message variant='danger'>{error}</Message>
            :
            (
                <Form onSubmit={submitHandler}>
                    <FormGroup controlId='name'>
                        <FormLabel>Name</FormLabel>
                        <FormControl 
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='price'>
                        <FormLabel>price</FormLabel>
                        <Form.Control 
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup controlId='image'>
                    <FormLabel>Image</FormLabel>
                        <FormControl
                            type='text'
                            placeholder=' Enter Image url'
                            value={image}
                            onChange={e => setImage(e.target.value)}
                            ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='brand'>
                    <FormLabel>Country</FormLabel>
                        <FormControl 
                            type='text'
                            placeholder=' Enter Country'
                            value={brand}
                            onChange={e => setBrand(e.target.value)}
                            ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='category'>
                    <FormLabel>Region</FormLabel>
                        <FormControl 
                            type='text'
                            placeholder=' Enter Region'
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='countInStock'>
                        <FormLabel>Count In Stock</FormLabel>
                        <FormControl 
                            type='number'
                            placeholder='Enter count In Stock'
                            value={countInStock}
                            onChange={e => setCountInStock(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                    
                    <FormGroup controlId='description'>
                        <FormLabel>Description</FormLabel>
                        <FormControl 
                            type='text'
                            placeholder='Description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <Button type='submit' variant='primary'>
                    Update
                    </Button>
                </Form>
            )}
           
        </FormContainer>
        </>
        
    )
}

export default DishEditScreen

