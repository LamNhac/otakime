import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBsWfL_ws_g-lu_PJin0cG48yH_M38PhX4",
//   authDomain: "otakime-dc208.firebaseapp.com",
//   databaseURL:
//     "https://otakime-dc208-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "otakime-dc208",
//   storageBucket: "otakime-dc208.appspot.com",
//   messagingSenderId: "1022690635838",
//   appId: "1:1022690635838:web:f0f624a2f6d0f64cea616f",
//   measurementId: "G-8RP2DN4733",
// };
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
var email = "mail.otakime@gmail.com";
var password = "otakime30";

const getUser = async () => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Xác thực thành công
      const user = userCredential.user;
      // Tiếp tục thực hiện các hoạt động sau xác thực
      return user.getIdToken();
    })
    .catch((error) => {
      console.error(error);
    });
};
export { app, getUser };
