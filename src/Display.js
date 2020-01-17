import React, { Component } from 'react';

const MOMENT = "moment";
const GUEST = "guest";

class Display extends Component {
  constructor(props) {
    super(props);

    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleGuestMouseEnter = this.handleGuestMouseEnter.bind(this);
    this.handleGuestMouseLeave = this.handleGuestMouseLeave.bind(this);
    this.handleGuestClick = this.handleGuestClick.bind(this);
    this.handleMomentMouseEnter = this.handleMomentMouseEnter.bind(this);
    this.handleMomentMouseLeave = this.handleMomentMouseLeave.bind(this);
    this.handleMomentClick = this.handleMomentClick.bind(this);
    this.handleConnectionsClick = this.handleConnectionsClick.bind(this);
  }

  handleCloseClick(e) {
    this.props.guest ?
      this.props.handlers.updateGuestClicked(null) :
      this.props.handlers.updateMomentsClicked([]);
  }

  handleGuestMouseEnter(e) {
    this.props.handlers.updateGuestHovered(parseInt(e.target.id));
  }

  handleGuestMouseLeave(e) {
    this.props.handlers.updateGuestHovered(null);
  }

  handleGuestClick(e) {
    this.props.handlers.updateGuestClicked(parseInt(e.target.id));
  }

  handleMomentMouseEnter(e) {
    this.props.handlers.updateMomentsHovered([parseInt(e.target.id)]);
  }

  handleMomentMouseLeave(e) {
    this.props.handlers.updateMomentsHovered([]);
  }

  handleMomentClick(e) {
    this.props.handlers.updateMomentsClicked([parseInt(e.target.id)]);
  }

  handleConnectionsClick(e) {
    this.props.handlers.updateShowConnections(!this.props.appState.showConnections);
  }

  checkHighlight(type, object) {
    const appState = this.props.appState;

    if (type === GUEST) {
      return appState.guestHovered && appState.guestHovered === object.id;
    }

    if (type === MOMENT) {
      // A moment is highlighted if it’s hovered, or if a guest that was at this
      // moment is hovered.
      return (appState.momentsHovered && appState.momentsHovered.includes(object.id)) ||
        (appState.guestHovered && appState.guestsIndex[appState.guestHovered].moment_ids.includes(object.id));
    }
  }

  renderGuestMoments(guest) {
    if (guest.moments && guest.moments.length > 0) {
      return guest.moments.map((moment) => {
        if (!moment) return null;
        const dateString = moment.date.toDateString().replace(' 2019', '');
        const black = this.checkHighlight(MOMENT, moment) ? "black" : "";

        return (
          <li
            key={moment.id}
            id={moment.id}
            className={`guestMoment ${black}`}
            onMouseEnter={this.handleMomentMouseEnter}
            onMouseLeave={this.handleMomentMouseLeave}
            onClick={this.handleMomentClick}
          >
            {dateString} — {moment.title || moment.moment_type}
          </li>
        )
      })
    }
  }

  renderGuest() {
    const guest = this.props.guest;
    return (
      <div className="guest">
        <div>{guest.name}</div>
        <div>
          <div>Moments: {guest.moments.length}</div>
          <ul>
            {this.renderGuestMoments(guest)}
          </ul>
        </div>
      </div>
    )
  }

  renderMomentGuests(moment) {
    if (moment.guests && moment.guests.length > 0) {
      return moment.guests.map((guest) => {
        if (!guest) return null;
        const yellow = this.checkHighlight(GUEST, guest) ? "yellow" : "";
        return (
          <li
            key={guest.id}
            id={guest.id}
            className={`momentGuest ${yellow}`}
            onMouseEnter={this.handleGuestMouseEnter}
            onMouseLeave={this.handleGuestMouseLeave}
            onClick={this.handleGuestClick}
          >
            {guest.name}
          </li>
        )
      })
    }
  }

  renderMoments() {
    if (this.props.moments && this.props.moments.length > 0) {
      const moments = this.props.moments.map((moment, i) => {
        return (
          <div key={i} className="moment">
            { moment.title || moment.moment_type }
            <ul>
              {this.renderMomentGuests(moment)}
            </ul>
            { i >= this.props.moments.length - 1 ? "" : <hr/> }
          </div>
        )
      });

      return (
        <div>
          <div className="momentDate">
            {this.props.moments[0].date.toDateString()}
          </div>
          {moments}
        </div>
      )
    }

    return "← hover over a #"
  }

  renderClose() {
    const appState = this.props.appState;

    if (
      (appState.momentsClicked && appState.momentsClicked.length > 0) ||
      appState.guestClicked
    ) {
      return (
        <div className="close" onClick={this.handleCloseClick}>x </div>
      )
    }
  }

  render() {
    const content = this.props.guest ? this.renderGuest() : this.renderMoments();

    return (
      <div className="Display">
        {content}
        {this.renderClose()}
      </div>
    )
  }
}

export default Display;
