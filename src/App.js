import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import DataViz2019 from './DataViz2019';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter basename="/">
          <Route path='/:name' component={DataViz2019} />
        </HashRouter>
      </div>
    )
  }
}

export default App;
