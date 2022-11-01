from flask import Flask,Blueprint,render_template,request,redirect,session,url_for

from flask_wtf import FlaskForm
from flask_wtf.file import FileField,FileRequired
from wtforms import StringField,MultipleFileField,DateField,SelectField
from wtforms.validators import DataRequired,InputRequired

from firebase import db,storage,user
from datetime import datetime
admin = Blueprint('admin', __name__)

class CreateValidate(FlaskForm):
    manga = StringField("*Tên tiếng Nhật bằng chữ Latin như: Ore wo Aishisugiteru Shugoshin wa!, Asmodeus wa Akiramenai,...", validators=[InputRequired()])
    nameManga = StringField("*Tên tiếng Việt của Manga", validators=[InputRequired()])
    author = StringField("author", validators=[InputRequired()])
    otherName = StringField("otherName",validators=[InputRequired()])
    tags = StringField("*Ở mỗi thể loại thì phải cách nhau bằng khoảng trắng",validators=[InputRequired()])

    updateAt = DateField("updateAt",validators=[InputRequired()])
    description = StringField("description", validators=[InputRequired()])
    imgIndex = FileField("*Ảnh Index có kích thước 1000 x 1574",validators=[FileRequired()])
    imgMain = FileField("*Ảnh Main có kích thước 1471 x 2018",validators=[FileRequired()])
    imgCover = FileField("*Ảnh Cover có kích thước 1920 x 1652",validators=[FileRequired()])
    chapter = StringField("chapter", validators=[InputRequired()])
    imgChapter = MultipleFileField('imgChapter',validators=[DataRequired()])

class updateChapterValidate(FlaskForm):
    manga = StringField(validators=[DataRequired()])
    imgChapter = MultipleFileField(validators=[InputRequired()])

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

    form  = CreateValidate()

    if request.method == 'POST':
        manga = form.manga.data
        nameManga = form.nameManga.data
        author = form.author.data
        otherName = form.otherName.data
        tags = form.tags.data
        updateAt = form.updateAt.data.strftime("%d/%m/%Y")
        description = form.description.data
        imgIndex = form.imgIndex.data
        print(imgIndex)
        imgMain = form.imgMain.data
        imgCover = form.imgCover.data
        chapter = form.chapter.data
        imgChapter = form.imgChapter.data


        print(imgIndex)
        print(imgMain)
        print(imgCover)
        print(imgChapter)
        #check img index co dc add khong?
        if imgIndex == None:
            print("img index chua dc them")
            dbimgIndex= ""
        else: 
            pass
            storage.child("manga").child(manga).child("logo").child(imgIndex.filename).put(imgIndex,user['idToken'])
            dbimgIndex = storage.child("manga").child(manga).child("logo").child(imgIndex.filename).get_url(user['idToken'])
        #add img banner va cover vao trong storage firebase
        storage.child("manga").child(manga).child("logo").child(imgMain).put(imgMain,user['idToken'])
        storage.child("manga").child(manga).child("logo").child(imgCover).put(imgCover,user['idToken'])


        dbimgMain = storage.child("manga").child(manga).child("logo").child(imgMain.filename).get_url(user['idToken'])
        dbimgCover = storage.child("manga").child(manga).child("logo").child(imgCover.filename).get_url(user['idToken'])

        #add img chapter vao trong storage firebase
        for item in imgChapter:
            print(item)
            storage.child("manga").child(manga).child("chapter").child(f"{chapter}").child(item.filename).put(item, user['idToken'])

         #add json manga realtime database
        db.child(manga).update({
                "nameManga":nameManga,
                "author":author,
                "otherName":otherName,
                "tags": tags,
                "updateAt":updateAt,
                "description":description,
                "imgIndex":dbimgIndex,
                "imgMain":dbimgMain,
                "imgCover":dbimgCover,
            })
        db.child(nameManga).child("chapter").update({
                f"Chap {chapter}":[storage.child("manga").child(nameManga).child("chapter").child(f"{chapter}").child(item.filename).get_url(user['idToken']) for item in imgChapter]
            })
        return render_template("admin/page/adminPost.html", form = form, success = True)
    title= "Otakime - Admin - Create"
    return render_template(
        'admin/create.html',
        title = title,
        form = form
    
    )

@admin.route('/admin/updatechapter',methods = ['GET','POST'])
def updateChapter():
    if not session.get("name"):
        return redirect("/admin")

    form = updateChapterValidate()
    
    title= "Otakime - Admin - Update chapter"

    if request.method == "POST":
        manga = form.manga.data
        imgChapter = form.imgChapter.data
        print(manga)
        print(imgChapter)
    return render_template(
        'admin/updateChapter.html',
        form=form
    
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

