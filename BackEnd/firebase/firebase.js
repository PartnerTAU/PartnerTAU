
const firebase = require("firebase");

var firebaseConfig = {
    databaseURL: "https://partnerTAU.firebaseio.com",
    apiKey: "AIzaSyBdIWvWi10QWGLsMbxpIusNrbeJNG_90Zs",
    authDomain: "partnertau-6ca03.firebaseapp.com",
    projectId: "partnertau-6ca03",
    storageBucket: "partnertau-6ca03.appspot.com",
    messagingSenderId: "845765179630",
    appId: "1:845765179630:web:c6d85817becddeeaf35bff",
    measurementId: "G-ZHHDY60NZW"
};


const init = firebase.initializeApp(firebaseConfig);
var database = firebase.database();



module.exports = init
