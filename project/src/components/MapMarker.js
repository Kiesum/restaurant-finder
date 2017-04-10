import React, {Component} from 'react'

export default class MapMarker extends Component {

  render() {
    return (
      <div>
        <img className="map-marker" src="http://www.googlemapsmarkers.com/v1/d54937" />
        <div className="marker-info">
          <div>{this.props.address[0]}</div>
          <div>{this.props.address[1]}</div>
          <div>{this.props.address[2]}</div>          
        </div>
      </div>
    )
  }
}
