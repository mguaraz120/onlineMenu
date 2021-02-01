import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'


const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    
    useEffect(() => {
        if(!user.name || user._id !==userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, user, userId])

    const submitHandler = e => {
        e.preventDefault()

    }
    
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
            <h1>edit User</h1>
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

                    <FormGroup controlId='email'>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl 
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='isadmin'>
                        <FormCheck 
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={e => setIsAdmin(e.target.checked)}
                            ></FormCheck>
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

export default UserEditScreen

