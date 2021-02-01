import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import DishScreen from './screens/DishScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UsersListScreen from './screens/UsersListScreen'
import UserEditScreen from './screens/UserEditScreen'
import DishListScreen from './screens/DishListScreen'
import DishEditScreen from './screens/DishEditScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/orders/:id' component={OrderScreen} />
          <Route path='/placeOrder' component={PlaceOrderScreen} />
          <Route path='/perfil' component={ProfileScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/dish/:id' component={DishScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UsersListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/dishlist' component={DishListScreen} />
          <Route path='/admin/dish/:id/edit' component={DishEditScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
