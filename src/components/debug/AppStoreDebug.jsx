import React, { Component } from "react";
import "./AppStoreDebug.css";

class AppStoreDebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
  }

  componentDidMount() {
    this.handleKeyUp = (e) => {
      if (e.key === "/") {
        this.setState((prevState) => ({ showing: !prevState.showing }));
      }
    };
    window.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  renderTable() {
    if (!window._store) return <div>There is no _store.</div>;

    const rows = [];
    for (let storeKey in window._store.state) {
      let val = window._store.state[storeKey];

      if (val && typeof val === "object" && val.length && val.length > 0) {
        val = `Array(${val.length})`; // special display for arrays
      }

      if (val && typeof val === "string" && val.length && val.length > 100) {
        val = `${val.substring(0, 100)}...`; // special display for long strings
      }

      rows.push(
        <tr key={storeKey}>
          <td>{storeKey}</td>
          <td>{val}</td>
        </tr>
      );
    }

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  render() {
    return (
      <>
        <div
          id="socket-indicator"
          onClick={() =>
            this.setState((prevState) => ({ showing: !prevState.showing }))
          }
        ></div>
        {this.state.showing && <div id="debug-panel">{this.renderTable()}</div>}
      </>
    );
  }
}

export default AppStoreDebug;