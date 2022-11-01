from flask import Flask,Blueprint
from client import client
from admin import admin
from flask_session import Session
app = Flask(__name__)
app.config['SECRET_KEY'] = "a random string"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.register_blueprint(client)
app.register_blueprint(admin)
Session(app)

if __name__ == '__main__':
	app.run(debug=True)