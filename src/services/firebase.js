import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, getRedirectResult, onAuthStateChanged, signInWithCredential, signInWithEmailAndPassword, signInWithRedirect, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";


// const firebaseConfig = {
//   apiKey: "AIzaSyApshDCxy63wCTEjAICrB3GIKIde3GB308",
//   authDomain: "test-54333.firebaseapp.com",
//   databaseURL:
//     "https://test-54333-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "test-54333",
//   storageBucket: "test-54333.appspot.com",
//   messagingSenderId: "731309557585",
//   appId: "1:731309557585:web:02cef1b555e45a2052b570",
// };
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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

var auth = getAuth(app); // Khởi tạo Firebase Authentication

const provider = new GoogleAuthProvider();

// var email = "mail.otakime@gmail.com";
// var password = "otakime30";

const signInAdminUser = async (email, password,onSuccess, onError) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Xác thực thành công
      const user = userCredential.user;
      // Tiếp tục thực hiện các hoạt động sau xác thực
      onSuccess(user)
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

// Đối với admin
const setAdminClaims = async () => {
  const user = auth.currentUser;
  if (user) {
    await user.getIdTokenResult(true);
    await setAdminClaims(user.uid, { admin: true });
  }
};

// Đối với client
const setClientClaims = async () => {
  const user = auth.currentUser;

  if (user) {
    await user.getIdTokenResult(true);
    await auth.setCustomUserClaims(user.uid, { admin: false });
  }
};

export { app, auth,database, getRedirectResultUser, logout, onChangeToken, signInAdminUser, signInClientUser, verifyToken 
  ,setAdminClaims,
  setClientClaims
};

