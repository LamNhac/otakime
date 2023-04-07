from pyrebaseLib.pyrebase import pyrebase
firebaseConfig = {
    "apiKey": "AIzaSyApshDCxy63wCTEjAICrB3GIKIde3GB308",
    "authDomain": "test-54333.firebaseapp.com",
    "projectId": "test-54333",
    "storageBucket": "test-54333.appspot.com",
    "messagingSenderId": "731309557585",
    "appId": "1:731309557585:web:02cef1b555e45a2052b570",
    "databaseURL": ""
}
firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
email = "ngodinhluan567@gmail.com"
password = "Ngodinhluan1@"
user = auth.sign_in_with_email_and_password(email, password)

