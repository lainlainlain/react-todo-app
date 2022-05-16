import { getDatabase } from "firebase/database";
import {
    initializeApp
} from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlk1OvUxfjt8VeD-GBhMdRdOpSkJfD_WU",
    authDomain: "todo-app-firebase-a698a.firebaseapp.com",
    projectId: "todo-app-firebase-a698a",
    storageBucket: "todo-app-firebase-a698a.appspot.com",
    messagingSenderId: "1021899880657",
    appId: "1:1021899880657:web:c8fa96e44a3e25aa412df0",
    measurementId: "G-8MXZK49MM9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {
    db
};