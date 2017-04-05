import React, { Component } from 'react'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'

export default class Restaurants extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      name: props.restaurant.name,
      image_url: props.restaurant.image_url,
      restaurant_url: props.restaurant.url
    }
  }

  addToFavorites() {
    var self = this;
    var user = firebase.auth().currentUser;
    if (user) {
      var favoritesRef = ref.child('users').child(user.uid).child('info').child('favorites');
      favoritesRef.push().set({
        name: self.state.name,
        image_url: self.state.image_url,
        restaurant_url: self.state.restaurant_url
      });
    } else {
      console.log("User is logged out");
    }
  }
    render () {
      return (
        <button onClick={this.addToFavorites.bind(this)}>favorite</button>
      )
    }
}