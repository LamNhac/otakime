from django.shortcuts import render

from pyrebaseLib.pyrebase import pyrebase
firebaseConfig = {
    "apiKey": "AIzaSyApshDCxy63wCTEjAICrB3GIKIde3GB308",
    "authDomain": "test-54333.firebaseapp.com",
    "projectId": "test-54333",
    "storageBucket": "test-54333.appspot.com",
    "messagingSenderId": "731309557585",
    "appId": "1:731309557585:web:02cef1b555e45a2052b570",
    "databaseURL": "https://test-54333-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
email = "ngodinhluan567@gmail.com"
password = "Ngodinhluan1@"
user = auth.sign_in_with_email_and_password(email, password)

storage = firebase.storage()
database = firebase.database()

def home(request):
    data = storage.child(
        "anh.jpg").get_url(user['idToken'])

    # local_file_path = "anh.jpg"


    print(database.child("1"))
    # storage.child(
    #     local_file_path).put(local_file_path, user['idToken'])

    # # Lấy URL của file ảnh từ Firebase Storage
    # image_url = storage.child(
    #     local_file_path).get_url(user['idToken'])

    # # In ra URL của file ảnh
    # print(image_url)

    return render(request=request, template_name='home.html', context={"data": data})
