import firebase from "firebase/app"
import "firebase/firestore"


var firebaseConfig = {
    apiKey: "AIzaSyAk33-QwXfQP35tbT5hKR0pP-liGvEew3Y",
    authDomain: "weatherapp-f2cc0.firebaseapp.com",
    projectId: "weatherapp-f2cc0",
    storageBucket: "weatherapp-f2cc0.appspot.com",
    messagingSenderId: "937836688866",
    appId: "1:937836688866:web:6f2f46458dd920d36b75bb"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()