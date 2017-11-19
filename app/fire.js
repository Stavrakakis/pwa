import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDc7CnzaZuB1mTx-YACKsy9mPe-CqqqO5Y",
    authDomain: "escapes-5e64d.firebaseapp.com",
    databaseURL: "https://escapes-5e64d.firebaseio.com",
    projectId: "escapes-5e64d",
    storageBucket: "",
    messagingSenderId: "483365151447"
};

const fire = firebase.initializeApp(config);

export default fire;
