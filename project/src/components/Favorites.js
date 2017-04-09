import React, { Component } from 'react'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import RestaurantList from './RestaurantList'

export default class Restaurants extends Component {
  constructor(props) {
    super(props)
    
    this.state = { favorites: [] }
  }

  componentDidMount() {
    var self = this;
    var user = firebase.auth().currentUser;
    var favoritesRef = ref.child('users').child(user.uid).on("value", function(snapshot) {
      self.renderAll(snapshot.val().info.favorites)
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  renderAll(favorites) {
    var favoritesArray = [];
    for (var key in favorites) {
      favorites[key].id = key;
      favoritesArray.push(favorites[key]);
    }
    this.setState({ favorites: favoritesArray })
  }

  render () {
    return (
      <div>
      {this.state.favorites.length > 0 ? <RestaurantList items={this.state.favorites} favorites="true" /> : <p style={styles.noFavorites}>You have no favorite restaurants :(</p>}
      </div>
    )
  }
}

const styles = {
  noFavorites: {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "16px",
  }
}