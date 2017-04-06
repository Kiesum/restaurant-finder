import React, { Component } from 'react'
import AddRemoveButton from './AddRemoveButton'
import { Row, Col } from 'react-bootstrap'
import Radium from 'radium'


function RestaurantInfo(props) {
  const items = props.items;
  const allItems = items.map((item, i) =>
    <Row style={styles.row} >
      <li style={styles.listItem} key={i}>
        <Col style={styles.col} xs={12} md={4}><img style={styles.image} src={item.image_url} /></Col> 
        <Col xs={10} xsOffset={1} mdOffset={0} md={8} style={styles.infoContainer} >  
          <a href={item.url}><h2 style={styles.name}>{item.name}</h2></a>
          <div style={styles.text}>Rating: {item.rating}</div>
          <div style={styles.text} >Number of Reviews: {item.review_count}</div>
          <div style={styles.text} >{item.price}</div>
          <AddRemoveButton restaurant={item} />
        </Col>
      </li>
    </Row>
  );
  return (
      <ul style={styles.list} >{allItems}</ul>
  )
}

const styles = {
  row: {
    margin: "0",
    background: "#F8F8F8",
    borderBottom: "1px solid rgb(210, 210, 210)",
    borderTop: "1px solid rgb(210, 210, 210)"
  },
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
  listItem: {
    marginBottom: "0"
  },
  infoContainer: {
    display: "inline-block",
    textAlign: "center",
    padding: "30px",
    background: "#FFFFFF",
    position: "relative",
    top: "-30px",
    border: "1px solid rgb(210, 210, 210)",
    
    '@media screen and (min-width: 100px)': {
        display: 'none'
    }
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