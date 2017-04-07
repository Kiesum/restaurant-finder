import React, { Component } from 'react'
import AddRemoveButton from './AddRemoveButton'
import { Row, Col } from 'react-bootstrap'
import Radium from 'radium'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'
import Restaurant from './Restaurant'

class RestaurantInfoSample extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const items = this.props.items;
    const allItems = items.map((item, i) =>
      <div key={i}>
        <Restaurant info={item} />
      </div>
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

module.exports = RestaurantInfoSample;