import React, { Component } from 'react'
import AddRemoveButton from './AddRemoveButton'
import { Row, Col } from 'react-bootstrap'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'
import RestaurantMeta from './RestaurantMeta'
import RestaurantDetails from './RestaurantDetails'
import RemoveFavorite from './RemoveFavorite'

export default class Restaurant extends Component {
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
    console.log(this.porops)
    return (
      <div> 
        <Row className="restaurant-row">
          <li className="list-item">
            <Col style={styles.col} xs={12} md={4}><img style={styles.image} src={this.props.info.image_url} /></Col> 
            <Col xs={10} xsOffset={1} mdOffset={0} md={4} className="info-container" > 
              <div style={styles.infoContainer}>
                <RestaurantMeta info={this.props.info} />
                { this.props.favorites ?
                  <RemoveFavorite key={this.props.info.id} key_id={this.props.info.id} /> :
                  <AddRemoveButton restaurant={this.props.info} />
                }
                <button className="secondary-btn" onClick={this.toggleDetails.bind(this)}>Toggle map</button>
              </div>
            </Col>
              { this.state.detailsVisible && 
                <Col md={12} style={styles.col}>
                { this.props.favorites ?
                  <RestaurantDetails address={this.props.info.display_address} latitude={this.props.info.latitude} longitude={this.props.info.longitude} /> :
                  <RestaurantDetails address={this.props.info.location.display_address} latitude={this.props.info.coordinates.latitude} longitude={this.props.info.coordinates.longitude} />
                }
                </Col>
              }
          </li>
        </Row>
      </div>
    )
  }
}

const styles = {
  col: {
    padding: "0"
  },
  image: {
    width: "100%",
    padding: "0",
    height: "325px",
    objectFit: "cover"
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  infoContainer: {
    margin: "auto",
    width: "75%"
  },
  name: {
    color: "#000000",
    marginTop: "0"
  },
  text: {
    padding: "5px 0"
  }
}