import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsWfL_ws_g-lu_PJin0cG48yH_M38PhX4",
    authDomain: "otakime-dc208.firebaseapp.com",
    databaseURL: "https://otakime-dc208-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "otakime-dc208",
    storageBucket: "otakime-dc208.appspot.com",
    messagingSenderId: "1022690635838",
    appId: "1:1022690635838:web:f0f624a2f6d0f64cea616f",
    measurementId: "G-8RP2DN4733"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
var storageRef = firebase.storage().ref();
