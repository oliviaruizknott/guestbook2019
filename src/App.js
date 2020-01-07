import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataViz2019 from './DataViz2019';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={DataViz2019} />
          <Route path='/:name' component={DataViz2019} />
        </div>
      </Router>
    )
  }
}

export default App;
