import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker'

export default class Map extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      center: {lat: this.props.coordinates.latitude, lng: this.props.coordinates.longitude}
    }
  }

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={11}
      >
        <MapMarker
          lat={this.props.coordinates.latitude}
          lng={this.props.coordinates.longitude}
          address={this.props.coordinates.address}
        />
      </GoogleMapReact>
    );
  }
}