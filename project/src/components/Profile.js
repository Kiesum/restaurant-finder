import React, { Component } from 'react'
import firebase from 'firebase'

export default class Profile extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      profile_url: '',
      displayName: ''
    }
  }
   
  componentDidMount() {
    var user = firebase.auth().currentUser;
    this.setState({ profile_url: user.photoURL,
                    displayName: user.displayName })
  }

  render () {
    return (
      <li>
        <img src={this.state.profile_url} />
        <span>Welcome {this.state.displayName}</span>
      </li>
    )
  }
}
