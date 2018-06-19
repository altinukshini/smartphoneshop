import * as firebase from "firebase";
const config = {
    apiKey: "AIzaSyCdEoSFoaITLUJx-SvjQm3L2cESzOw7qQ0",
    authDomain: "smartphoneshop-ubt.firebaseapp.com",
    databaseURL: "https://smartphoneshop-ubt.firebaseio.com",
    projectId: "smartphoneshop-ubt",
    storageBucket: "smartphoneshop-ubt.appspot.com",
    messagingSenderId: "426948625010"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();