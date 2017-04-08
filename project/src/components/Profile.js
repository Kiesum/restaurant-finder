import React, { Component } from 'react'
import firebase from 'firebase'

export default class Profile extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      profile_url: this.props.profile_url,
      displayName: this.props.displayName
    }
  }
   
  componentDidMount() {
    var user = firebase.auth().currentUser;
    this.setState({ profile_url: user.photoURL,
                    displayName: user.displayName })
  }

  render () {
    return (
      <div style={styles.container}>
        <img style={styles.img} src={this.state.profile_url} />
        <span style={styles.name} >{this.state.displayName}</span>
      </div>
    )
  }
}

const styles={
  container: {
    display: "flex",
    padding: "10px",
    height: "75px",
    boxSizing: "content-box",
    alignItems: "center"
  },
  img: {
    position: "absolute",
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    objectFit: "cover"
  },
  name: {
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-word",
    marginLeft: "90px",
    verticalAlign: "middle",
    fontSize: "14px",
    fontWeight: "bold",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "3",
    lineHeight: "20px",
    maxHeight: "60px"
  }
}

