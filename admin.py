from flask import Flask,Blueprint,render_template

admin = Blueprint('admin', __name__)

@admin.route('/admin')
def login():
    title= "Otakime - Login"
    return render_template('admin/login.html')

@admin.route('/admin/create')
def create():
    title= "Otakime - Admin - Create"
    return render_template(
        'admin/create.html',
       
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

