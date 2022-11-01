from flask import Flask,Blueprint,render_template,request,redirect,session,url_for
from flask_wtf import FlaskForm
from wtforms import StringField,SelectField,DateField,TextAreaField,MultipleFileField

from flask_wtf.file import FileField,FileRequired
from wtforms.validators import DataRequired 

admin = Blueprint('admin', __name__)

class Create(FlaskForm):
    manga = StringField(validators=[DataRequired()])
    nameManga = StringField(validators=[DataRequired()])
    author = StringField(validators=[DataRequired()])
    otherName = StringField(validators=[DataRequired()])
    tags = SelectField(choices=["data","class","required"],  validate_choice=True)   # type: ignore
    updateAt = DateField(format='%d/%m/%Y' )
    description = TextAreaField()
    imgIndex = FileField(validators=[FileRequired()])
    imgMain = FileField(validators=[FileRequired()])
    imgCover= FileField(validators=[FileRequired()])
    chapter = StringField(validators=[DataRequired()])
    imgChapter = MultipleFileField(validators=[FileRequired()])


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

@admin.route('/admin/create', methods = ['GET','POST'])
def create():

    if not session.get("name"):
        return redirect("/admin")

    form  = Create()

    if request.method == 'POST':
        pass
    title= "Otakime - Admin - Create"
    return render_template(
        'admin/create.html',
        title = title,
        form = form
    
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

