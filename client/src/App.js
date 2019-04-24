import React, { Component } from 'react';
import { Route, Redirect, Switch,BrowserRouter as Router } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';
import './styles/global.scss';
import './styles/Normalize.css';

import { Provider } from 'react-redux';
import store from './redux/store';

import Home from './components/home';
import Menu from './components/Menu';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <div>
                <ScrollMemory />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/menu/:product" component={Menu} />
                    <Route path="/menu" component={RedirectToMenuProduct} />
                </Switch>
            </div>
        </Router>
      </Provider>
    );
  }
}

const RedirectToMenuProduct = () => {
  return(
    <Redirect to='/menu/pizza' />
  )
}

export default App;
