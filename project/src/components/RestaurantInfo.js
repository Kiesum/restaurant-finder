import React, { Component } from 'react'
import AddRemoveButton from './AddRemoveButton'

function RestaurantInfo(props) {
  const items = props.items;
  const allItems = items.map((item) =>
    <li style={styles.listItem} className="row">
      <img className="col-md-6 col-xs-12" style={styles.image} src={item.image_url} />  
      <div style={styles.infoContainer} className="col-md-6 col-xs-12">  
        <a href={item.url}><h2 style={styles.name}>{item.name}</h2></a>
        <div>Rating: {item.rating}</div>
        <div>Number of Reviews: {item.review_count}</div>
        <div>{item.price}</div>
        <AddRemoveButton restaurant={item} />
      </div>
    </li>
  );
  return (
      <ul className="container" style={styles.list} >{allItems}</ul>
  )
}

const styles = {
  image: {
    padding: "0"
  },
  list: {
    listStyle: "none",
    padding: "1rem 0 0 0",
    margin: "0 15px"
  },
  listItem: {
    marginBottom: "5rem"
  },
  infoContainer: {
    display: "inline-block",
    verticalAlign: "top"
  },
  name: {
    color: "#d54937",
    marginTop: "0"
  }
}

module.exports = RestaurantInfo;