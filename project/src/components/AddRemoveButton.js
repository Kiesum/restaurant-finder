import React, { Component } from 'react'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'

export default class AddRemoveButton extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      addRemoveButton: 'Add to favorites',
      key_id: '',
      name: props.restaurant.name,
      image_url: props.restaurant.image_url,
      url: props.restaurant.url,
      price: props.restaurant.price,
      review_count: props.restaurant.review_count,
      rating: props.restaurant.rating
    }
  }

  componentDidMount () {
    var self = this;
    var user = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + user + '/info/favorites/').once('value').then(function(snapshot) {
      for (var key in snapshot.val()) {
        if (snapshot.val()[key]['name'] === self.state.name ) {
          self.setState({ key_id: key })
          self.setState({ addRemoveButton: 'Remove from favorites' })
        }
      }
    });
  }

  addRemove() {
    var self = this;
    var user = firebase.auth().currentUser;
    if (user && self.state.addRemoveButton === 'Add to favorites') {
      var favoritesRef = ref.child('users').child(user.uid).child('info').child('favorites');
      var newFavoritesRef = favoritesRef.push({
        name: self.state.name,
        image_url: self.state.image_url,
        url: self.state.url,
        price: self.state.price,
        review_count: self.state.review_count,
        rating: self.state.rating
      }, function(err) {
          console.log(err)
      }).then(function() {
        self.setState({ addRemoveButton: 'Remove from favorites' })
      });

    } else if (self.state.addRemoveButton === 'Remove from favorites') {
        var user = firebase.auth().currentUser.uid;
        var adaRef = firebase.database().ref('/users/' + user + '/info/favorites/' + self.state.key_id);
        adaRef.remove()
      .then(function() {
        self.setState({ addRemoveButton: 'Add to favorites' })
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
    }
  }

  render () {
    return (
      <input style={styles.button} type="button" onClick={this.addRemove.bind(this)} value={this.state.addRemoveButton}></input>
    )
  }
}

const styles = {
  button: {
    border: "1px solid green"
  }
}







