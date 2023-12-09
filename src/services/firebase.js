import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, getRedirectResult, onAuthStateChanged, signInWithCredential, signInWithEmailAndPassword, signInWithRedirect, signOut } from "firebase/auth";

import { } from "firebase/storage";

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
const provider = new GoogleAuthProvider();

// var email = "mail.otakime@gmail.com";
// var password = "otakime30";

const signInAdminUser = async (email, password,onSuccess, onError) => {
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


const getRedirectResultUser = ()=> {
  return new Promise( (resolve, reject) => {
    getRedirectResult(auth).then((result) => {
    resolve(result);
  })
  .catch((error) => {
    reject(error);
  })})
}

const signInClientUser = async () => {
    return new Promise((resolve, reject) => {
      signInWithRedirect (auth, provider)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
};

const verifyToken = async (idToken,accessToken) => {
  try {
    console.log("xxx")
    const credential = GoogleAuthProvider.credential(idToken,accessToken );
    const userCredential = await signInWithCredential(auth, credential);
    console.log("userCredential", userCredential)
    const user = userCredential.user;
    return user
  } catch (error) {
    console.error(error);
  }
};

const onChangeToken = async () => {
  return new Promise((resolve, reject)=> {
    try {
      onAuthStateChanged(auth, (user)=> {
        resolve(user)
      });
    } catch (error) {
      reject(error)
    }
  })
};

const logout = async ()=> {
  return new Promise((resolve, reject)=> {
    signOut(auth).then(()=>{
      resolve()
    }).catch(error=>{
      reject(error)
    })  
  })
}

export { app, getRedirectResultUser, logout, onChangeToken, signInAdminUser, signInClientUser, verifyToken };

