import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyA4UDCqMKJWPorZXQ7lh59ZawOPhqSl63U",
    authDomain: "mtarcherycoach.firebaseapp.com",
    databaseURL: "https://mtarcherycoach.firebaseio.com",
    projectId: "mtarcherycoach",
    storageBucket: "mtarcherycoach.appspot.com",
    messagingSenderId: "337400391771"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;