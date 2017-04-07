import React, { Component } from 'react'
import AddRemoveButton from './AddRemoveButton'
import { Row, Col } from 'react-bootstrap'
import Radium from 'radium'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'
import RestaurantMeta from './RestaurantMeta'

class RestaurantInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const items = this.props.items;
    const allItems = items.map((item, i) =>
      <Row className="restaurant-row" key={i}>
        <li className="list-item">
          <Col style={styles.col} xs={12} md={4}><img style={styles.image} src={item.image_url} /></Col> 
          <Col xs={10} xsOffset={1} mdOffset={0} md={8} className="info-container" > 
            <RestaurantMeta info={item} />
            <AddRemoveButton restaurant={item} />
          </Col>
        </li>
      </Row>
    );
  return (
      <ul style={styles.list} >{allItems}</ul>
    )
  }
}

const styles = {
  col: {
    padding: "0"
  },
  image: {
    width: "100%",
    padding: "0"
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  infoContainer: {
    display: "inline-block",
    textAlign: "center",
    padding: "30px",
    background: "#FFFFFF",
    position: "relative",
    top: "-30px",
    border: "1px solid rgb(210, 210, 210)",

    ':hover': {
      background: "grey"
    },
  },
  name: {
    color: "#000000",
    marginTop: "0"
  },
  text: {
    padding: "5px 0"
  }
}

module.exports = RestaurantInfo;