import React, { Component } from 'react'
import { auth, saveUser } from '../helpers/auth'
import firebase from 'firebase'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { 
    registerError: null,
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: '',
    myFileName: "",
    myFileHandle: {}
  }
  
  handleSubmit(e) {
    var self = this;
    e.preventDefault()
    if (this.cpw.value === this.pw.value) {

      if (this.state.myFileName) {
        var uploadTask = firebase.storage().ref('images').child(this.state.myFileName).put(this.state.myFileHandle)
        uploadTask.on('state_changed', function(snapshot){
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {
          // Handle unsuccessful uploads
          console.log(error)
          this.setState(setErrorMsg(error))
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          var downloadURL = uploadTask.snapshot.downloadURL;
          this.setState({avatarURL: downloadURL})
          auth(this.email.value, this.pw.value, this.name.value, downloadURL, this.state.myFileName )
              .catch(function(e) {
                self.setState(setErrorMsg(e))
                const imageRef = firebase.storage().ref('images').child(self.state.myFileName);
                imageRef.delete().then(function() {
                  console.log('deleted')
                });
              })
        }.bind(this))

      } else {
        this.setState(setErrorMsg({ message: 'Please upload an image' }))
      }

    } else {
      this.setState(setErrorMsg({ message: 'Passwords do not match.' }));
    }
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

  handleChange(event) {
    this.setState( {myFileName: event.target.files[0].name} );
    this.setState( {myFileHandle: event.target.files[0]} );
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('register-avatar');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }


  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Register</h1>
        <button className="loginBtn loginBtn-facebook" onClick={this.handleSignIn.bind(this)}>Register with Facebook</button>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" id="name" ref={(name) => this.name = name} placeholder="Name"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" id="email" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" className="form-control" placeholder="Confirm Password" ref={(cpw) => this.cpw = cpw} />
          </div>
          <img src="http://www.gravatar.com/avatar/?d=mm" id="register-avatar" />
          <label id="image-upload" className="secondary-btn">Upload an image
            <input type="file" onChange={this.handleChange.bind(this)} id="profilePhotoFileUpload" />
          </label>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <button type="submit" className="primary-btn register-btn">Register</button>
        </form>
      </div>
    )
  }
}
