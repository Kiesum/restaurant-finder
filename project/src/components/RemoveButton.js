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
    console.log(this.state)
    var user = firebase.auth().currentUser.uid;
    var adaRef = firebase.database().ref('/users/' + user + '/info/favorites/' + this.state.key);
    adaRef.remove()
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
    // var self = this;
    // var user = firebase.auth().currentUser;
    // if (user) {
    //   var favoritesRef = ref.child('users').child(user.uid).child('info').child('favorites').orderByChild("restaurant_url").equalTo(self.state.restaurant_url).on('child_added', function(snapshot) {
    //     console.log(snapshot.name())
    //   });
    //   // favoritesRef.push().set({
    //   //   name: self.state.name,
    //   //   image_url: self.state.image_url,
    //   //   restaurant_url: self.state.restaurant_url
    //   // });
    // } else {
    //   console.log("User is logged out");
    // }
  }
    render () {
      return (
        <button onClick={this.removeFromFavorites.bind(this)}>remove</button>
      )
    }
}