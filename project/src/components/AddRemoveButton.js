import React, { Component } from 'react'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'

export default class AddRemoveButton extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      addRemoveButton: 'favorite',
      key_id: '',
      name: props.restaurant.name,
      image_url: props.restaurant.image_url,
      restaurant_url: props.restaurant.url,
    }
  }

  componentDidMount () {
    var self = this;
    var user = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + user + '/info/favorites/').once('value').then(function(snapshot) {
      for (var key in snapshot.val()) {
        if (snapshot.val()[key]['name'] === self.state.name ) {
          self.setState({ key_id: key })
          self.setState({ addRemoveButton: 'remove' })
        }
      }
    });
  }

  addRemove() {
    var self = this;
    var user = firebase.auth().currentUser;
    if (user && self.state.addRemoveButton === 'favorite') {
      var favoritesRef = ref.child('users').child(user.uid).child('info').child('favorites');
      var newFavoritesRef = favoritesRef.push({
        name: self.state.name,
        image_url: self.state.image_url,
        restaurant_url: self.state.restaurant_url
      }, function(err) {
          console.log(err)
      }).then(function() {
        self.setState({ addRemoveButton: 'remove' })
      });

    } else if (self.state.addRemoveButton === 'remove') {
        var user = firebase.auth().currentUser.uid;
        var adaRef = firebase.database().ref('/users/' + user + '/info/favorites/' + self.state.key_id);
        adaRef.remove()
      .then(function() {
        self.setState({ addRemoveButton: 'favorite' })
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
    }
  }

  render () {
    return (
      <input type="button" onClick={this.addRemove.bind(this)} value={this.state.addRemoveButton}></input>
    )
  }
}