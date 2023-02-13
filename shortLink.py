

from flask import Blueprint,render_template,request
import random
import string
from  pyshorteners import Shortener
shortlink = Blueprint('shortlink', __name__)


def random_string_generator():
    return ''.join(random.choices(string.ascii_letters + string.digits, k = 5))    

@shortlink.route('/shortlink', methods =['GET','POST'])
def shortLink():
    domain = "otakime.onrender.com"
    id = 1 

    if request.method == 'POST':
        regex = random_string_generator()
        link = request.form.get('link')
        s = Shortener()
        
        print(regex)
        return render_template('shortlink/shortLink.html', shortened_url =s.tinyurl.short('http://www.google.com'))
    return render_template('shortlink/shortLink.html')