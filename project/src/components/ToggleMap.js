import React, { Component } from 'react'

export default class ToggleMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      detailsVisible: false
    }
  }

  toggleDetails() {
    this.setState({ detailsVisible: !this.state.detailsVisible });
  }

  render() {
    return (
      <button className="secondary-btn" onClick={this.toggleDetails.bind(this)}>Toggle map</button>
    )
  }

}