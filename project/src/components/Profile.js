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
      <span>
        <img style={styles.img} src={this.state.profile_url} />
        <span style={styles.name} >{this.state.displayName}</span>
      </span>
    )
  }
}

const styles={
  img: {
    width: "50px",
    padding: "0.5rem"
  },
  name: {
    display: "inline-block",
    width: "100px",
    marginLeft: "1rem",
    verticalAlign: "middle",
    fontSize: "12px"
  }
}
