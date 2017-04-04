import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDa5egE_caM0vDp-r357shvN8pxm67IaoA",
  authDomain: "hiring-project.firebaseapp.com",
  databaseURL: "https://hiring-project.firebaseio.com",
  projectId: "hiring-project",
  storageBucket: "hiring-project.appspot.com",
  messagingSenderId: "843009074755"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth