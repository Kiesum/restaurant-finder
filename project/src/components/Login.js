import React, { Component } from 'react'
import { login, resetPassword, saveUser } from '../helpers/auth'
import firebase from 'firebase'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {
  state = { loginMessage: null }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  handleSignIn() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      saveUser(user);
      // ...
    }).catch(function(error) { 
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(error)
      // ...
    });
  }

  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Login </h1>
        <button className="loginBtn loginBtn-facebook" onClick={this.handleSignIn.bind(this)}>Login with Facebook</button>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" id="email" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.loginMessage &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
            </div>
          }
          <button type="submit" className="primary-btn login-btn">Login</button>
        </form>
      </div>
    )
  }
}
