const firebaseConfig = {
    apiKey: "AIzaSyBNSiRO5XRUBz_MKA5F1HiUrxoUypL1mPw",
    authDomain: "flappy-scores.firebaseapp.com",
    databaseURL: "https://flappy-scores-default-rtdb.firebaseio.com",
    projectId: "flappy-scores",
    storageBucket: "flappy-scores.appspot.com",
    messagingSenderId: "916803610806",
    appId: "1:916803610806:web:a1d8b677fd9a283eb29e17",
    measurementId: "G-BP1VNFCNT1"
  };
     
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();