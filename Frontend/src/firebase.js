import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/compat/firestore"; // for cloud firestore
const firebaseConfig = {
	apiKey: "AIzaSyA6_Nn8QI72DeqIMuzzgTpP5UKM0il5AAY",
	authDomain: "messaging-app-frontend-9a118.firebaseapp.com",
	projectId: "messaging-app-frontend-9a118",
	storageBucket: "messaging-app-frontend-9a118.appspot.com",
	messagingSenderId: "895288988474",
	appId: "1:895288988474:web:bdd72155ac669d1f977603",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.log(firebaseApp);
const db = firebase.firestore();
export const auth = getAuth(firebaseApp);
console.log(auth);
export const provider = new GoogleAuthProvider();
export default db;
