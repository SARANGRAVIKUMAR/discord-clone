import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyChPZVZeCKFZH_Eo-f39R5Pdrt4tjEk82o",
  authDomain: "discord-840ea.firebaseapp.com",
  projectId: "discord-840ea",
  storageBucket: "discord-840ea.appspot.com",
  messagingSenderId: "1065625563927",
  appId: "1:1065625563927:web:805090d1e566b7b8073d52",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
