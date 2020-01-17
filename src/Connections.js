import React, { Component } from 'react';

class Connections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guest: null
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const guest = this.props.appState.guestsIndex[this.props.appState.guestClicked]
    if (prevState.guest !== guest) {
      this.setState({ guest })
    }
  }

  handleMouseEnter(e) {
    this.props.handlers.updateGuestHovered(parseInt(e.target.id));
  }

  handleMouseLeave(e) {
    this.props.handlers.updateGuestHovered(null);
  }

  handleClick(e) {
    this.props.handlers.updateGuestClicked(parseInt(e.target.id));
  }

  shouldHighlight(guest) {
    const moments = this.props.appState.momentsHovered.map((momentId) => {
      return this.props.appState.momentsIndex[momentId]
    })

    for (let m of moments) {
      if (m.guest_ids.includes(guest.id)) return true;
    }

    return false
  }

  renderConnectedGuests() {
    const displayedGuest = this.state.guest;
    if (!displayedGuest) return;
    const connections = displayedGuest.connections;
    const list = connections.map((connection) => {
      const connectedGuest = this.props.appState.guestsIndex[connection.guestId];
      const black = this.shouldHighlight(connectedGuest) ? "black" : ""
      return (
        <li
          key={`${displayedGuest.id}-${connectedGuest.id}`}
          id={connectedGuest.id}
          className={`connectedGuest ${black}`}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
        >
          {connectedGuest.name} ({connection.momentIds.length})
        </li>
      )
    })

    return (
      <ul>
        {list}
      </ul>
    )
  }

  render() {
    const guest = this.state.guest;
    if (!guest) return null;

    return (
      <div className="Connections">
        <br/>
        <div>Connections: {guest.connections.length}</div>
        {this.renderConnectedGuests()}
      </div>
    )
  }
}

export default Connections;
