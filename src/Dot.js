import React, { Component } from 'react';

class Dot extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(e) {
    const momentIds = this.props.moments.map(moment => moment.id)
    this.props.handlers.updateMomentsHovered(momentIds);
  }

  handleMouseLeave(e) {
    // Clear the ids
    this.props.handlers.updateMomentsHovered([]);
  }

  handleClick(e) {
    const momentIds = this.props.moments.map(moment => moment.id)
    this.props.handlers.updateMomentsClicked(momentIds);
  }

  render() {
    const hasMoments = this.props.moments.length
    const symbol = hasMoments ? "# " : ". ";
    const hoverable = hasMoments ? "hoverable" : "";

    return (
      <span
        className={`Dot ${hoverable} ${this.props.highlight}`}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {symbol}
      </span>
    )
  }
}

export default Dot;
