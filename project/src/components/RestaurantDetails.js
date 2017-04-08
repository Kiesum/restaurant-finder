import React, { Component } from 'react'
import Map from './Map'

export default class RestaurantDetails extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={styles.container}>
        <Map coordinates={this.props} />
      </div>
    )
  }
}

const styles = {
  container: {
    width: "100%",
    height: "325px",
    zIndex: "0"
  }
}