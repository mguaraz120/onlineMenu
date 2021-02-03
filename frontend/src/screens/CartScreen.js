import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, FormControl, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


const CartScreen = ( {match, location, history} ) => {
    const DishId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (DishId) {
            dispatch(addToCart(DishId, qty))
        }
    }, [dispatch, DishId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=payment')
    }

    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>
                Want more? GO BACK to the menu!
            </Link>
        <Row>
            <Col md={8}>
                <h1>Your Tray</h1>
                {cartItems.length === 0 
                ? <Message>Your tray is empty <Link to='/'>Main Menu</Link></Message>
                : <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroupItem key={item.dish}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/dish/${item.dish}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2}>
                                    <FormControl as='select' value={item.qty} onChange={e => dispatch(addToCart(item.dish, Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={x+1}> {x+1} </option>
                                        ))}
                                    </FormControl>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.dish)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    ))}
                </ListGroup> }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) </h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button 
                                type='button' 
                                className='btn-block' 
                                disabled={cartItems.length===0}
                                onClick={checkoutHandler}
                            >
                                Proceed to Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default CartScreen
