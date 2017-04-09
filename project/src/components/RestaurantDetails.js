import React, { Component } from 'react'
import Map from './Map'

export default class RestaurantDetails extends Component {

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