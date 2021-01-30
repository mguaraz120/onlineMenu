import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3 }) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <NavItem>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <NavLink>Sign In</NavLink>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Sign In</NavLink>
                )}
            </NavItem>
            <NavItem>
                {step1 ? (
                    <LinkContainer to='/payment'>
                        <NavLink>Payment</NavLink>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Payment</NavLink>
                )}
            </NavItem>
            <NavItem>
                {step1 ? (
                    <LinkContainer to='/Placeorder'>
                        <NavLink>Place Order</NavLink>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Place Order</NavLink>
                )}
            </NavItem>
        </Nav>
    )
}

export default CheckoutSteps
