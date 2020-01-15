import React, { Component } from 'react';
import Dot from './Dot';

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: null
    };
  }

  componentDidMount() {
    this.makeDates();
  }

  makeDates() {
    const current = new Date(2019, 0, 1);
    const end = new Date(2020, 0, 1);
    const dates = [];

    // Set the current date to be the Sunday before the new year.
    current.setDate(current.getDate() - current.getDay());

    while (current < end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    this.setState({ dates });
  }

  // Returns an array of <Dot/> components (with <br/> elements)
  makeDots() {
    if (!this.state.dates) return;

    const dots = [];

    // For each date in state, make a dot; add moment data if applicable
    for (let date of this.state.dates) {
      const moments = this.findMoments(date);
      const highlight = this.checkHighlight(moments);

      dots.push(<Dot
        key={date.toString()}
        moments={moments}
        highlight={highlight}
        handlers={this.props.handlers}
      />)

      // If the date is a Saturday, add a line break
      if (date.getDay() === 6) {
        dots.push(
          <br key={`br-${date.toString()}`} />
        );
      }
    }

    return dots;
  }

  // Returns an array of the moments that took place on the given date
  findMoments(date) {
    const dateMoments = [];
    const moments = this.props.appState.momentsIndex;

    for (let m in moments) {
      // If the moment date matches the given date, add it to our array
      if (moments[m].date.getTime() === date.getTime()) {
        dateMoments.push(moments[m])
      }
    }

    return dateMoments;
  }

  // returns "yellow" or "black" or ""
  checkHighlight(moments) {
    let highlight = "";
    const appState = this.props.appState;
    const clickedGuest = appState.guestsIndex[appState.guestClicked];
    const hoveredGuest = appState.guestsIndex[appState.guestHovered];
    const selectedGuest = clickedGuest || hoveredGuest;
    const selectedGuestMoments = selectedGuest && selectedGuest.moment_ids;

    // The dot should be yellow if a moment that it represents is hovered or
    // clicked anywhere; or if a moment that it represents is included in the
    // list of guest moments
    if (
      this.includesMoments(moments, appState.momentsHovered) ||
      this.includesMoments(moments, appState.momentsClicked) ||
      this.includesMoments(moments, selectedGuestMoments)
    ) {
      highlight = "yellow";
    }

    // GUEST CLICKED && MOMENT HOVERED
    // The dot should be black if a guest is clicked and a guest moment is
    // hovered.
    if (
      clickedGuest &&
      this.includesMoments(moments, appState.momentsHovered) &&
      this.includesMoments(moments, selectedGuestMoments)
    ) {
      highlight = "black";
    }

    // GUEST CLICKED && GUEST HOVERED
    // The dot should be black if a guest is clicked and the hovered connected
    // guest shares a moment
    if (clickedGuest && hoveredGuest) {
      const connection = clickedGuest.connections.find((c) => {
        return c.guestId === hoveredGuest.id;
      });

      const connectedMoments = connection.momentIds;

      if (this.includesMoments(moments, connectedMoments)) {
        highlight = "black";
      }
    }

    return highlight;
  }

  includesMoments(moments, array) {
    if (array) {
      for (let m of moments) {
        if (array.includes(m.id)) return true;
      }
    }

    return false;
  }

  render() {
    return (
      <div className="Calendar">
        {this.makeDots()}
      </div>
    )
  }
}

export default Calendar;
