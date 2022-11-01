from flask import Flask,Blueprint,render_template,request,redirect,session,url_for
from flask_wtf import FlaskForm
from wtforms import StringField
admin = Blueprint('admin', __name__)

@admin.route('/admin' ,methods =['GET','POST'])
def login():
    title= "Otakime - Login"
    usernameRoot = "potato"
    passwordRoot = "potato"
    if request.method == 'POST':

        username = request.form.get('username')
        password = request.form.get('password')
        if username == usernameRoot and password == passwordRoot:
            session["name"] = username
            return redirect('/admin/create') 

    return render_template('admin/login.html')

@admin.route("/logout")
def logtout():
    session.pop('name',None)
    return redirect('/admin')

@admin.route('/admin/create')
def create():

    if not session.get("name"):
        return redirect("/admin")

    title= "Otakime - Admin - Create"
    return render_template(
        'admin/create.html',
        title = title
    
    )

@admin.route('/admin/updatechapter')
def updateChapter():
    title= "Otakime - Admin - Update chapter"
    return render_template(
        'admin/updateChapter.html',
       
    )

@admin.route('/admin/deletechapter')
def deleteChapter():
    title= "Otakime - Admin - Delete chapter"
    return render_template(
        'admin/deleteChapter.html',
       
    )

@admin.route('/admin/deletemanga')
def deleteManga():
    title= "Otakime - Admin - Delete manga"
    return render_template(
        'admin/deleteManga.html',
       
    )

@admin.route('/admin/gmailcustom')
def gmailCustom():
    title= "Otakime - Admin - Gmail custom"
    return render_template(
        'admin/gmailCustom.html',
       
    )

@admin.route('/admin/gmailhire')
def gmailHire():
    title= "Otakime - Admin - Gmail hire"
    return render_template(
        'admin/gmailHire.html',
       
    )

