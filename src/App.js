import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppStoreDebug from "./components/debug/AppStoreDebug";
import DataViz2019 from "./DataViz2019";
import Mobile from "./Mobile";
import "./App.css";

class App extends Component {
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  deviceComponent(nfc = false) {
    return this.isMobile() ? <Mobile nfc={nfc} /> : <DataViz2019 nfc={nfc} />;
  }

  render() {
    return (
      <Router>
        <AppStoreDebug />
        <div className="App">
          <Route exact path="/" render={() => this.deviceComponent()} />
          <Route exact path="/nfc" render={() => this.deviceComponent(true)} />
        </div>
      </Router>
    );
  }
}

export default App;
