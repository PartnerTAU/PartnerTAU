const firebase = require("firebase");
var firebaseConfig = {
    // apiKey: "AIzaSyDLWnmvtOIhuxwiMF3G3Cqai-6ot3n5GHI",
    // authDomain: "login-fa213.firebaseapp.com",
    // databaseURL: "https://login-fa213-default-rtdb.firebaseio.com",
    // projectId: "login-fa213",
    // storageBucket: "login-fa213.appspot.com",
    // messagingSenderId: "230240635406",
    // appId: "1:230240635406:web:7511feb3bb27f847154a5f",
    databaseURL: "https://partnerTAU.firebaseio.com",
    apiKey: "AIzaSyBdIWvWi10QWGLsMbxpIusNrbeJNG_90Zs",
    authDomain: "partnertau-6ca03.firebaseapp.com",
    projectId: "partnertau-6ca03",
    storageBucket: "partnertau-6ca03.appspot.com",
    messagingSenderId: "845765179630",
    appId: "1:845765179630:web:c6d85817becddeeaf35bff",
    measurementId: "G-ZHHDY60NZW"
    //measurementId: "G-ZHHDY60NZW"
};


const init = firebase.initializeApp(firebaseConfig);
var database = firebase.database();



module.exports = init
