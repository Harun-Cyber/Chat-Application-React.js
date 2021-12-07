import firebase from "firebase/app";
import "firebase/auth";

//export all authentication from firebase to initialize the app
export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDjHB67_I0aXXTHs5PlcjC2iACMohiOYCE",
    authDomain: "besto-frendo-chat.firebaseapp.com",
    projectId: "besto-frendo-chat",
    storageBucket: "besto-frendo-chat.appspot.com",
    messagingSenderId: "524088398828",
    appId: "1:524088398828:web:fb6e75cc7f9ea0c5f926c9"
  }).auth();