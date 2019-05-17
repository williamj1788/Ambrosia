import React, { Component } from 'react';
import { Route, Redirect, Switch,BrowserRouter as Router } from 'react-router-dom';
import './styles/global.scss';
import './styles/Normalize.css';

import { Provider } from 'react-redux';
import store from './redux/store';

import LoadUser from './components/LoadUser';

import Home from './components/home';
import Menu from './components/Menu';
import Meet from './components/Meet';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UserOrder from './components/UserOrder';
import Products from './components/Products';
import Metrics from './components/Metrics';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <LoadUser>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/menu" component={RedirectToMenuProduct} />
                <Route path="/menu/:product" component={Menu} />
                <Route path='/meet' component={Meet} />
                <Route path='/signup' component={SignUp} />
                <Route path='/login' component={Login} />
                <Route path='/user/orders' component={UserOrder} />
                <Route path='/admin/products' component={Products} />
                <Route path='/admin/metrics' component={Metrics} />
            </Switch>
          </LoadUser>
        </Router>
      </Provider>
    );
  }
}

export const RedirectToMenuProduct = () => {
  return(
    <Redirect to='/menu/pizza' />
  )
}

export default App;
