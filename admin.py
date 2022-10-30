from flask import Flask,Blueprint,render_template

admin = Blueprint('admin', __name__)

@admin.route('/login')
def login():
    return 'Login'

