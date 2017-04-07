import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import Radium from 'radium'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'

export default class RestaurantMeta extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span> 
        <a href={this.props.info.url}><h2 style={styles.name}>{this.props.info.name}</h2></a>
        <a href={'tel:' + this.props.info.display_phone.replace(/\s/g, "-")}>{this.props.info.display_phone}</a>
        <div style={styles.text}>Rating: {this.props.info.rating}</div>
        <div style={styles.text} >Number of Reviews: {this.props.info.review_count}</div>
        <div style={styles.text} >{this.props.info.price}</div>
      </span>
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