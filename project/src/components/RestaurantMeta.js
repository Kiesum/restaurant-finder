import React, { Component } from 'react'
import firebase from 'firebase'

export default class RestaurantMeta extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span> 
        <a href={this.props.info.url}><h2 style={styles.name}>{this.props.info.name}</h2></a>
        <a href={'tel:' + this.props.info.display_phone.replace(/\s/g, "-")}>{this.props.info.display_phone}</a>
        <div>  
          <span style={styles.review}>{this.props.info.rating}</span>
          <span style={styles.text} >({this.props.info.review_count} reviews)</span>
        </div>
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
    marginTop: "0",
    fontWeight: "300"
  },
  text: {
    padding: "5px 0",
    fontWeight: "300"
  },
  review: {
    fontSize: "20px",
    marginRight: "5px",
    fontWeight: "300"
  }
}