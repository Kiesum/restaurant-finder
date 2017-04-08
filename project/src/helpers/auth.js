import firebase from 'firebase'
import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw, displayName, avatar, fileName) {
  var displayName = displayName;
  var fileName = fileName;
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(function(user){
      user.updateProfile({
        displayName: displayName,
        photoURL: avatar
      })
    window.location = '/';
    })
    .then(saveUser)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser() {
  var user = firebase.auth().currentUser;
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
      favorites: '',
    })
    .catch(function(error) {
      console.log(error);
      alert(error.message)
    })
    .then(() => user)
}

