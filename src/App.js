import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppStoreDebug from './components/debug/AppStoreDebug';
import DataViz2019 from './DataViz2019';
import Mobile from './Mobile';
import './App.css';

class App extends Component {
  deviceComponent() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return Mobile;
    } else {
      return DataViz2019;
    }
  }

  render() {
    return (
      <Router>
        <AppStoreDebug />
        <div className="App">
          <Route path='/' component={this.deviceComponent()} />
        </div>
      </Router>
    )
  }
}

export default App;
