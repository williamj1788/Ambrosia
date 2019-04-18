import React, { Component } from 'react';
import { Route, Switch,BrowserRouter as Router } from 'react-router-dom';
import './styles/global.scss';
import './styles/Normalize.css';

import { Provider } from 'react-redux';
import store from './redux/store';

import Home from './components/home';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
