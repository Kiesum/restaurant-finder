import React, { Component } from 'react'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'

export default class RemoveButton extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      key: props.key_id
    }
  }

  removeFromFavorites() {
    var user = firebase.auth().currentUser.uid;
    var adaRef = firebase.database().ref('/users/' + user + '/info/favorites/' + this.state.key);
    adaRef.remove()
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  }
  
    render () {
      return (
        <button onClick={this.removeFromFavorites.bind(this)}>remove</button>
      )
    }
}