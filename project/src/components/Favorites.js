import React, { Component } from 'react'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'
import RemoveButton from './RemoveButton'
import AddRemoveButton from './AddRemoveButton'

function FavoritesList(props) {
  const favorites =  props.favorites;
  const favoriteItems = favorites.map((favorite) =>
    <li>
      <img src={favorite.image_url} />
      <a href={favorite.restaurant_url}><h2>{favorite.name}</h2></a>
      <p>{ favorite.price }</p>
      <AddRemoveButton restaurant={favorite} />
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
      favorites[key].id = key;
      favoritesArray.push(favorites[key]);
    }
    this.setState({ favorites: favoritesArray })
    console.log(favoritesArray)
  }

  render () {
    return (
      <div>
        <FavoritesList favorites={ this.state.favorites} />
      </div>
    )
  }
}