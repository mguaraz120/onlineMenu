import React, {useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({match}) => {

    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    // Calculate prices
    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num * 100)/ 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {
        if(!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, order, orderId])


    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
        : 
        <>
        <h1>Order {order._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup >
                        <ListGroupItem>
                            <h2>Current Status</h2>
                        
                            {order.isPaid 
                            ? 
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                            : 
                            <Message variant='danger'>Not Paid</Message>
                            }

                            {order.isDelivered 
                            ? 
                            <Message variant='success'>Food is Ready {order.deliveredAt}</Message>
                            : 
                            <Message variant='danger'>Food is Not Ready Yet</Message>
                            }
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {' '}{order.orderItems.length === 0 ? <Message>Your tray is empty</Message> :
                            (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/dish/${item.dish}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )
                            }
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
  
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen
