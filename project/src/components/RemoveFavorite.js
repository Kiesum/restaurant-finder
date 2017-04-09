import React, { Component } from 'react'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'

export default class RemoveFavorite extends Component {

  handleRemove() {
    var user = firebase.auth().currentUser.uid;
    var restaurantRef = firebase.database().ref('/users/' + user + '/info/favorites/' + this.props.key_id);
    restaurantRef.remove()
  }

  render () {
    return (
      <input className="btn secondary-btn" type="button" onClick={(e) => this.handleRemove(e)} value="Remove from favorites"></input>
    )
  }
}








