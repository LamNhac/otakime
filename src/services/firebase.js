import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApshDCxy63wCTEjAICrB3GIKIde3GB308",
  authDomain: "test-54333.firebaseapp.com",
  databaseURL:
    "https://test-54333-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-54333",
  storageBucket: "test-54333.appspot.com",
  messagingSenderId: "731309557585",
  appId: "1:731309557585:web:02cef1b555e45a2052b570",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
var auth = getAuth(); // Khởi tạo Firebase Authentication
// var email = "mail.otakime@gmail.com";
// var password = "otakime30";

const signInUser = async (email, password,onSuccess, onError) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Xác thực thành công
      const user = userCredential.user;
      // Tiếp tục thực hiện các hoạt động sau xác thực
      onSuccess()
      return user.getIdToken();
    })
    .catch((error) => {
      onError(error)
    });
};
export { app, signInUser };
