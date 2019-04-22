import React, { Component } from 'react';
import { Route, Switch,BrowserRouter as Router } from 'react-router-dom';
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
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/menu" component={Menu} />
                </Switch>
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
