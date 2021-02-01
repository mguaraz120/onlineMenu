import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listDishes, deleteDish, createDish } from '../actions/dishActions'
import { DISH_CREATE_RESET} from '../constants/dishConstants'


const DishListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const dishList = useSelector(state => state.dishList)
    const { loading, error, dishes} = dishList

    const dishDelete = useSelector(state => state.dishDelete)
    const { 
        loading: loadingDelete, 
        error: errorDelete,
        success: successDelete} = dishDelete

        const dishCreate = useSelector(state => state.dishCreate)
    const { 
        loading: loadingCreate, 
        error: errorCreate,
        success: successCreate,
        dish: createdDish,
    } = dishCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({type: DISH_CREATE_RESET})

        if(!userInfo.isAdmin){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/dish/${createdDish._id}/edit`)
        } else {
            dispatch(listDishes())
        }

    }, [dispatch, userInfo, history, successDelete, successCreate, createdDish])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteDish(id))
        }
    }

    const createDishHandler = () => {
        dispatch(createDish())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Dishes</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createDishHandler}>
                        <i className='fas fa-plus'></i> Create Dish
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error 
            ? 
            <Message variant='danger'>{error}</Message> 
            :
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>REGION</th>
                        <th>COUNTRY</th>
                    </tr>
                </thead>
                <tbody>
                    {dishes.map(dish => (
                        <tr key={dish._id}>
                            <td>{dish._id}</td>
                            <td>{dish.name}</td>
                            <td>${dish.price}</td>
                            <td>{dish.category}</td>
                            <td>{dish.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/dish/${dish._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button 
                                    variant='danger' 
                                    className='btn-sm'
                                    onClick={() => deleteHandler(dish._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            }
        </>
    )
}

export default DishListScreen
