import React, { Component } from "react";
import Calendar from "./Calendar";
import Display from "./Display";
import Connections from "./Connections";

class DataViz2019 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      momentsIndex: {}, // { id: {id, date, guestIds: [id, id id] ...} ... }
      guestsIndex: {}, // { id: {id, name, full_name, momentIds: [id, id id] ...} ... }
      momentsHovered: [], // [ id, id, id ... ]
      momentsClicked: [], // [ id, id, id ... ]
      guestHovered: null, // id
      guestClicked: null, // id
      showConnections: false, // boolean
    };

    this.handlers = {
      updateMomentsHovered: this.updateMomentsHovered.bind(this),
      updateMomentsClicked: this.updateMomentsClicked.bind(this),
      updateGuestHovered: this.updateGuestHovered.bind(this),
      updateGuestClicked: this.updateGuestClicked.bind(this),
      updateShowConnections: this.updateShowConnections.bind(this),
    };
  }

  componentDidMount() {
    const moments = require("./moments");
    const converted = this.convertDates(moments);
    this.setState({ momentsIndex: converted });

    const guests = require("./guests");
    this.setState({ guestsIndex: guests }, this.setGuest);

    window._store.addListener(this, "GUEST");
  }

  GUEST(val) {
    this.setGuest(val);
  }

  // Converts the dates from the server (ruby) into javascript
  convertDates(moments) {
    for (let m in moments) {
      const dateArray = moments[m].date.split("-");
      moments[m].date = new Date(
        `${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`
      );
    }

    return moments;
  }

  setGuest(guestName = null) {
    const name = guestName || window.location?.hash?.replace("#", "");

    if (name) {
      const guests = this.state.guestsIndex;
      const guest = Object.keys(guests).find((guestId) => {
        return guests[guestId].name.toLowerCase() === name;
      });

      if (guest) {
        this.setState({ guestClicked: guest }, () => {
          this.setState({ loading: false });
        });
      }
    }
  }

  updateMomentsHovered(momentIds) {
    this.setState({ momentsHovered: momentIds });
  }

  // If you don’t want the side-effect of clearing the guests, pass a falsy
  // second argument.
  updateMomentsClicked(momentIds, clearGuests = true) {
    this.setState({ momentsClicked: momentIds });
    // Clear out the moment hovered or it might never happen
    this.updateMomentsHovered([]);
    // Clear out guest clicked, too
    if (clearGuests) this.updateGuestClicked(null);
  }

  updateGuestHovered(guestId) {
    this.setState({ guestHovered: guestId });
  }

  updateGuestClicked(guestId) {
    this.setState({ guestClicked: guestId });
    // Clear out the guest hovered or it might never happen
    this.updateGuestHovered(null);
  }

  updateShowConnections(val) {
    this.setState({ showConnections: val });
  }

  momentsDisplayed() {
    const clicked = this.state.momentsClicked;
    const hovered = this.state.momentsHovered;
    if (!clicked && !hovered) return [];

    if (clicked && clicked.length > 0) {
      return this.weaveMoments(clicked);
    }

    if (hovered && hovered.length > 0) {
      return this.weaveMoments(hovered);
    }

    return [];
  }

  // Given a list of moment ids, get their moment objects from the momentIndex
  // and weave in the guests.
  weaveMoments(ids) {
    const moments = this.hydrateList(ids, this.state.momentsIndex);

    for (let m of moments) {
      m.guests = this.hydrateList(m.guest_ids, this.state.guestsIndex);
    }

    return moments;
  }

  guestDisplayed() {
    if (!this.state.guestClicked) return null;

    // Make a copy of the guest from the index and hydrate the list of moments
    const guest = { ...this.state.guestsIndex[this.state.guestClicked] };
    guest.moments = this.hydrateList(guest.moment_ids, this.state.momentsIndex);

    return guest;
  }

  // Given a list of ids and an object to look them up in, return an array of
  // the looked-up values
  hydrateList(ids, index) {
    return ids.map((id) => {
      // return a copy, not the real thing
      return { ...index[id] };
    });
  }

  render() {
    return (
      <div className="DataViz2019">
        <div className="fullHeightContainer">
          <Calendar appState={this.state} handlers={this.handlers} />
        </div>
        <div className="fullHeightContainer">
          <Display
            moments={this.momentsDisplayed()}
            guest={this.guestDisplayed()}
            appState={this.state}
            handlers={this.handlers}
            nfc={this.props.nfc}
          />
        </div>
        <div className="fullHeightContainer">
          <Connections appState={this.state} handlers={this.handlers} />
        </div>
      </div>
    );
  }
}

export default DataViz2019;
