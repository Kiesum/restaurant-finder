import React, { Component } from 'react'
import firebase from 'firebase'
import { auth, ref } from '../config/constants'

export default class RemoveFavorite extends Component {
  constructor(props) {
    super(props) 
  }

  handleRemove() {
    var user = firebase.auth().currentUser.uid;
    var restaurantRef = firebase.database().ref('/users/' + user + '/info/favorites/' + this.props.key_id);
    restaurantRef.remove()
  }

  render () {
    return (
      <input style={styles.button} type="button" onClick={(e) => this.handleRemove(e)} value="Remove from favorites"></input>
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







