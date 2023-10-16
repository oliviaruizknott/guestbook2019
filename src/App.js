import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataViz2019 from './DataViz2019';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' component={DataViz2019} />
        </div>
      </Router>
    )
  }
}

export default App;
