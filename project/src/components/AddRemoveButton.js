import React, { Component } from 'react'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'

export default class AddRemoveButton extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      addRemoveButton: 'Add to favorites',
      key: props.key_id,
    }

  }

  componentDidMount () {
    this.getKey();
  }

  getKey () {
    var user = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + user + '/info/favorites/').once('value').then(function(snapshot) {
      for (var key in snapshot.val()) {
        if (snapshot.val()[key]['name'] === this.props.restaurant.name ) {
          this.setState({ key: key })
          this.setState({ addRemoveButton: 'Remove from favorites' })
        }
      }
    }.bind(this));
  }

  handleAddRemove() {
    if (this.state.addRemoveButton === 'Add to favorites') {
      this.handleAdd();
    } else if (this.state.addRemoveButton === 'Remove from favorites') {
      this.handleRemove();
    }
  }

  handleAdd() {
    var user = firebase.auth().currentUser;
    var favoritesRef = ref.child('users').child(user.uid).child('info').child('favorites');
    var newFavoritesRef = favoritesRef.push({
      name: this.props.restaurant.name,
      image_url: this.props.restaurant.image_url,
      url: this.props.restaurant.url,
      price: this.props.restaurant.price,
      review_count: this.props.restaurant.review_count,
      rating: this.props.restaurant.rating,
      display_phone: this.props.restaurant.display_phone,
      latitude: this.props.restaurant.coordinates.latitude,
      longitude: this.props.restaurant.coordinates.longitude,
      display_address: this.props.restaurant.location.display_address
    }).catch(function(err) {
        console.log(err)
    }).then(function() {
      this.setState({ addRemoveButton: 'Remove from favorites' })
      this.getKey()
    }.bind(this));
  }

  handleRemove() {
    var user = firebase.auth().currentUser.uid;
    var restaurantRef = firebase.database().ref('/users/' + user + '/info/favorites/' + this.state.key);
    restaurantRef.remove()
    .then(function() {
      this.setState({ addRemoveButton: 'Add to favorites' });
      console.log("Remove succeeded.");
    }.bind(this))
    .catch(function(error) {
      console.log("Remove failed: " + error.message);
    });
  }

  render () {
    return (
      <input key={this.state.key} className="btn secondary-btn" type="button" onClick={(e) => this.handleAddRemove(e)} value={this.state.addRemoveButton}></input>
    )
  }
}








