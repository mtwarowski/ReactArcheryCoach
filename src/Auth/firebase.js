import firebase from 'firebase'
// const config = {
//     apiKey: "AIzaSyA4UDCqMKJWPorZXQ7lh59ZawOPhqSl63U",
//     authDomain: "mtarcherycoach.firebaseapp.com",
//     databaseURL: "https://mtarcherycoach.firebaseio.com",
//     projectId: "mtarcherycoach",
//     storageBucket: "mtarcherycoach.appspot.com",
//     messagingSenderId: "337400391771"
// };
// firebase.initializeApp(config);


var config = {
    apiKey: "AIzaSyBrBhbbYtRujWvCFD_bAP4e3yhfBSrsbA8",
    authDomain: "we-score.firebaseapp.com",
    databaseURL: "https://we-score.firebaseio.com",
    projectId: "we-score",
    storageBucket: "we-score.appspot.com",
    messagingSenderId: "524880060786"
  };
  firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;