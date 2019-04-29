import React, { Component } from 'react';
import { Route, Redirect, Switch,BrowserRouter as Router } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';
import './styles/global.scss';
import './styles/Normalize.css';

import { Provider, connect } from 'react-redux';
import store from './redux/store';
import { setUser } from './redux/action';

import Home from './components/home';
import Menu from './components/Menu';
import Meet from './components/Meet';
import SignUp from './components/SignUp';
import Login from './components/Login';

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

class LoadUser extends React.Component{
  componentDidMount(){
    fetch('/api/user', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(!res.message){
        this.props.dispatch(setUser(res));
      }
    });
  }
  render(){
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default App;
