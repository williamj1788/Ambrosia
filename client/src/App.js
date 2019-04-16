import React, { Component } from 'react';
import { Route, Switch,BrowserRouter as Router } from 'react-router-dom';
import './styles/global.scss';
import './styles/Normalize.css';

import Home from './components/home'

class App extends Component {
  render() {
    return (
      <Router>
          <div>
              <Switch>
                  <Route exact path="/" component={Home} />
              </Switch>
          </div>
      </Router>
    );
  }
}

export default App;
