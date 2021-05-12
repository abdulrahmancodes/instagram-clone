import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/storage';
import { seedDatabase } from '../seed'

const config = {
    apiKey: "AIzaSyC9ix9cav0hiidwvsJztYIbJ1FEBajBkdg",
    authDomain: "instagram-clone-7d986.firebaseapp.com",
    projectId: "instagram-clone-7d986",
    storageBucket: "instagram-clone-7d986.appspot.com",
    messagingSenderId: "100740889126",
    appId: "1:100740889126:web:343d688bc82a1a03d984e7",
    measurementId: "G-WH36EJHPXG"
}

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
// seedDatabase(firebase);

export { firebase, FieldValue, Firebase };