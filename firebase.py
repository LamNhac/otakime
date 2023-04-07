import datetime
import json
# import jwt
from pyrebaseLib.pyrebase import pyrebase

# config = {
#     "apiKey": "AIzaSyBsWfL_ws_g-lu_PJin0cG48yH_M38PhX4",
#     "authDomain": "otakime-dc208.firebaseapp.com",
#     "databaseURL": "https://otakime-dc208-default-rtdb.asia-southeast1.firebasedatabase.app",
#     "projectId": "otakime-dc208",
#     "storageBucket": "otakime-dc208.appspot.com",
#     "messagingSenderId": "1022690635838",
#     "appId": "1:1022690635838:web:f0f624a2f6d0f64cea616f",
#     "measurementId": "G-8RP2DN4733",
#     "serviceAccount": "servicesAccountKey.json"
# } # otakime

config = {
    "apiKey": "AIzaSyApshDCxy63wCTEjAICrB3GIKIde3GB308",
    "authDomain": "test-54333.firebaseapp.com",
    "databaseURL": "https://test-54333-default-rtdb.asia-southeast1.firebasedatabase.app/",
    "projectId": "test-54333",
    "storageBucket": "test-54333.appspot.com",
    "messagingSenderId": "731309557585",
    "appId": "1:731309557585:web:02cef1b555e45a2052b570",
}  # test


firebase = pyrebase.initialize_app(config)
email = "mail.otakime@gmail.com"
password = "otakime30"
auth = firebase.auth()
user = auth.sign_in_with_email_and_password(email, password)


storage = firebase.storage()
db = firebase.database()


# DBFirebaseManga = db.get().val()['manga']
# manga_list = db.child("manga").get(user['idToken']).val() # in ra phan tu trong manga


# db.child("manga").child(len(manga_list)).update({"name": "abc"}, user['idToken'])
