import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore';
import 'firebase/storage'
import * as firebaseui from 'firebaseui'

let firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const fireAuth = firebase.auth()
export const db = firebase.firestore()
export const fs = firebase.storage()

const uiConfig = {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      },
    ],
    signInSuccessUrl: '/',
  }
  
export const startUi = (elementId) => {
    if (firebaseui.auth.AuthUI.getInstance()) {
        const ui = firebaseui.auth.AuthUI.getInstance()
        ui.start(elementId, uiConfig)
      } else {
        const ui = new firebaseui.auth.AuthUI(firebase.auth())
        ui.start(elementId, uiConfig)
      }
}