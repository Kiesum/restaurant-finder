import React, { Component } from 'react'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'

function FavoritesList(props) {
  const favorites =  props.favorites;
  const favoriteItems = favorites.map((favorite) =>
    <li>
      <img src={favorite.image_url} />
      <a href={favorite.restaurant_url}><h2>{favorite.name}</h2></a>
    </li>
  );
  return (
    <ul>{ favoriteItems }</ul>
  )
}

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
      favoritesArray.push(favorites[key]);
    }
    this.setState({ favorites: favoritesArray })
  }

  render () {
    return (
      <div>
        <FavoritesList favorites={ this.state.favorites} />
      </div>
    )
  }
}