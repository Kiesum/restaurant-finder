import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw, displayName) {
  var displayName = displayName;
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(function(user){
      user.updateProfile({
        displayName: displayName
    });
  }).then(saveUser);
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

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
      favorites: '',
    })
    .then(() => user)
}

