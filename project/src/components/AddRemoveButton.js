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
    var user = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + user + '/info/favorites/').once('value').then(function(snapshot) {
      for (var key in snapshot.val()) {
        if (snapshot.val()[key]['name'] === this.state.name ) {
          this.setState({ key_id: key })
          this.setState({ addRemoveButton: 'Remove from favorites' })
        }
      }
    }.bind(this));
  }

  addRemove() {
    var user = firebase.auth().currentUser;
    if (user && this.state.addRemoveButton === 'Add to favorites') {
      var favoritesRef = ref.child('users').child(user.uid).child('info').child('favorites');
      var newFavoritesRef = favoritesRef.push({
        name: this.state.name,
        image_url: this.state.image_url,
        url: this.state.url,
        price: this.state.price,
        review_count: this.state.review_count,
        rating: this.state.rating
      }, function(err) {
          console.log(err)
      }).then(function() {
        this.setState({ addRemoveButton: 'Remove from favorites' })
      }.bind(this));

    } else if (this.state.addRemoveButton === 'Remove from favorites') {
        var user = firebase.auth().currentUser.uid;
        var adaRef = firebase.database().ref('/users/' + user + '/info/favorites/' + this.state.key_id);
        adaRef.remove()
      .then(function() {
        this.setState({ addRemoveButton: 'Add to favorites' })
        console.log("Remove succeeded.")
      }.bind(this))
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
    }
  }

  render () {
    return (
      <input style={styles.button} type="button" onClick={(e) => this.addRemove(e)} value={this.state.addRemoveButton}></input>
    )
  }
}

const styles = {
  button: {
    border: "1px solid rgb(210, 210, 210)",
    background: "#FFFFFF",
    padding: "10px 20px"
  }
}







