// <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
// <script>
  // Initialize Firebase

import firebase from 'firebase';
require('firebase/firestore');

  var config = {
    apiKey: "AIzaSyDI_ZWCNjGppCsjFK1F1WrzMPvv7AY4RDg",
    authDomain: "react-fire-21dbd.firebaseapp.com",
    databaseURL: "https://react-fire-21dbd.firebaseio.com",
    projectId: "react-fire-21dbd",
    storageBucket: "react-fire-21dbd.appspot.com",
    messagingSenderId: "681443131081"
  };
  firebase.initializeApp(config);
// </script>

export const db = firebase.firestore()