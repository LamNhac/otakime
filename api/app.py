from flask import current_app,Flask,render_template,redirect,session,request,url_for

from flask_session import Session
from flask_mail import Mail,Message

app = Flask(__name__, static_url_path='/static')
with app.app_context():
    app.config['SECRET_KEY'] = "a random string"
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"


    mail_username='mail.otakime@gmail.com'
    mail_password='lpavozmbebtxdhbb'

    app.config.update(dict(
        DEBUG = True,
        MAIL_SERVER = 'smtp.gmail.com',
        MAIL_PORT = 587,
        MAIL_USE_TLS = True,
        MAIL_USE_SSL = False,
        MAIL_USERNAME = mail_username,
        MAIL_PASSWORD = mail_password,
    ))

    mail = Mail(app)

    from api.Client import client
    from api.Admin import admin
    from api.shortLink import shortlink
    app.register_blueprint(client, )
    app.register_blueprint(admin)
    app.register_blueprint(shortlink)
    Session(app)

    @app.route('/test')
    def test():
        return render_template('test.html')
    """
    @app.route('/ads.txt')
    def ads():
        return  render_template('ads.html')
    """
    @app.route('/dieukhoan')
    def terms():
        return render_template('client/TermandConditions.html'  )

    @app.route('/admin/gmailcustom', methods =['GET','POST'])
    def gmailCustom():
        if not session.get("name"):
            return redirect("/admin")
        
        if request.method == "POST":

            #emailTaker = request.form.get('emailTaker')
            name = request.form.get('name')
            email = request.form.get('email')
            subject = request.form.get('subject')
            title = request.form.get('title')
            content = request.form.get('content')


            content = [ item.rstrip() for item in content.split("\n")]

            
            msg = Message(
                subject=f'{subject}',
                sender= mail_username,
                recipients=[email],
                html = render_template('admin/mail/layout/mailCustomLayout.html', name = name, title=title, content=content)
                #body= f'Name: {name}\nEmail: {email}\nMessage: {message}' 
            )
            mail.send(msg)
            return render_template('admin/mail/mailCustom.html', success = True)
        title= "Otakime - Admin - Gmail custom"
        return render_template(
            'admin/mail/mailCustom.html',
        title = title
        )

    @app.route('/admin/gmailhire', methods = ['GET','POST'])
    def gmailHire():
        if not session.get("name"):
            return redirect("/admin")


        if request.method == "POST":
            name = request.form.get('name')
            email = request.form.get('email')
            subject = request.form.get('subject')

            msg = Message(
                    subject=f'{subject}',
                    sender= mail_username,
                    recipients=[email],
                    html = render_template('admin/mail/layout/mailHireLayout.html', name = name)
                    #body= f'Name: {name}\nEmail: {email}\nMessage: {message}' 
                )

            mail.send(msg)

            return render_template('admin/mail/mailHire.html', success = True)
        else:
            print("Chua post")
        title= "Otakime - Admin - Gmail hire"
        return render_template(
            'admin/mail/mailHire.html',
            title = title
        )



if __name__ == '__main__':

    app.run(debug=True)