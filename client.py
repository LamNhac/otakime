

from flask import Blueprint,render_template,request,current_app
from model import getManga,getMovie


from flask_session import Session
from flask_mail import Mail,Message

from app import mail_password,mail_username

client = Blueprint('client', __name__)


mail = Mail(current_app)

@client.route('/')
def home():


    kanjoHome = {}
    chinkoHome = {}
    toaruHome = {}
    mizoreHome = {}
    title= 'Otakime - Home'
    description = 'Trang web chính thức của nhóm dịch Otakime, Việt hóa những dự án manga nhằm giới thiệu độc giả. Truy cập ngay để đọc những tựa truyện được yêu thích.'

    for item in getManga():
        if item.keyName == "Kawaii Kanojo-chan":
            kanjoHome.update({
                "keyName": item.keyName,
                "imgIndex": item.imgIndex,
            })
        if item.keyName == "Ore no Kokan wa Bishoujo Datta no ka":
            chinkoHome.update({
                "keyName": item.keyName,
                "imgIndex": item.imgIndex,
            })
        if item.keyName == "Toaru Meoto no Nichijou":
            toaruHome.update({
                "keyName": item.keyName,
                "imgIndex": item.imgIndex,
            })
        if item.keyName == "Tokedase Mizore-chan":
            mizoreHome.update({
                "keyName": item.keyName,
                "imgIndex": item.imgIndex,
            })

    srcLogo = "https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/logo%2Fotakime_logo.png?alt=media&token=1d3a37bb-fd34-42fd-be41-c9cf1424f472"
    return render_template(
        'client/home.html',
        srcLogo = srcLogo,
        dbKanjo = kanjoHome,
        dbToaru = toaruHome,
        dbMizore = mizoreHome,
        dbChinko = chinkoHome,
        title= title,
        description = description
        )

@client.route('/about')
def about():
    title = 'Otakime - About'
    return render_template(
        'client/about.html',
        title = title
        )

@client.route('/manga')
def manga():
    title = 'Otakime - Manga'
    description = 'Đọc ngay những tựa truyện được Việt hóa chất lượng bởi Otakime.'
    _manga = {}
    index=0
    for item in getManga():
        _manga.update({
            index:{
            "keyName":item.keyName,
            "nameManga":item.nameManga,
            "imgMain":item.imgMain,
            "tags" : ", ".join(item.tags)
            }
        })
        index+=1

    return render_template(
            'client/manga/manga.html',
            db = _manga,
            title = title,
            description = description
        )

@client.route('/<url>')
def detailManga(url):
    urlMovie = "https://animevietsub.cc/phim/yuru-camp-movie-a4813/xem-phim-88141.html"
    imgAds = "https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/logo%2Fyuru-camp-movie-ad.jpg?alt=media&token=66bc426f-e92d-4934-837a-7987197e95ec"

    for item in getManga():
        if url == item.keyName.lower().replace(" ","-"):
            title = f"Otakime - {item.keyName}"
            description = f"{item.description}"
            index = list(item.chapter)[0].lower().replace('chap ','')
            
            return render_template(
                'client/manga/detailManga.html',
                indexFirst = index,
                db = item,
                dbChapter = item.chapter.keys(),
                title = title,
                description=description,
                imgAds = imgAds,
                urlMovie = urlMovie
            )

    return render_template('404.html', title="Otakime - 404" , description = "Có thể bạn đi nhầm đâu đó...")

@client.route('/<url>/<urlChapter>')
def chapterManga(url,urlChapter):
    img = []
    _dict = {}
    chapterPrevious =""
    chapterNext = ""
    chapterPresent =""
   
    for item in getManga():

        if url == item.keyName.lower().replace(" ","-"):
            for keyChapter,valueIMG in item.chapter.items():
                if  keyChapter.lower().replace('chap ','') == urlChapter:
                    title = f"Otakime - {item.keyName} - {keyChapter}"
                    description = f"{item.description}"
                    chapterPresent = keyChapter
                    img.append(valueIMG)

                    try:
                        _listChapter = [i for i in item.chapter]
                        indexPresent = _listChapter.index(chapterPresent)
                        chapterPrevious = _listChapter[indexPresent - 1 ]

                        chapterNext = _listChapter[indexPresent + 1 ] 
                    except IndexError:
                        chapterNext =""
                      
                

                    _dict.update({
                        "keyName":item.keyName,
                        "nameManga": item.nameManga,
                        "chapterDropdown": item.chapter.keys(),
                        "chapterPrevious": chapterPrevious,
                        "chapterNext": chapterNext
                    })
        

                    return render_template(
                        'client/manga/chapterManga.html',

                        db = _dict,
                        dbIMG = img,
                        chapterPresent = chapterPresent,
                        title = title,
                        description =description,

                        )
    else:
        return render_template('404.html' ,title="Otakime - 404" , description = "Có thể bạn đi nhầm đâu đó...")
@client.route('/wheel', methods = ['GET','POST'])
def wheel():

    return render_template('client/wheel.html')

@client.route('/movie')
def movie():
    title="Otakime - Movie"
    description=""
    _movie = {}

    for item in getMovie():
       _movie.update({
            "keyName":item.keyName,
            "nameMovie":item.nameMovie,
            "description":item.description,
            "otherName":item.otherName,
            "director": item.director,
            "studio":item.studio,
            "writer":item.writer,
            "imgMain":item.imgMain,
            "stars" :item.stars,
            "src" : item.src
  
       })



    return render_template('client/movie/movie.html',            
        db = _movie,
        title= title,
        description = description
    )

@client.route('/movie/<urlMovie>', methods=['GET','POST'])
def movieScreen(urlMovie):
    server = request.args.get('server')

    _movie = {}

    for item in getMovie():
        print(item.src[f'{server}'],)
        title=f"Otakime - {item.keyName}"
        description= item.description   
        if  urlMovie ==item.keyName.lower().replace(' ','-') :
            _movie.update({
                "keyName":item.keyName,
                "src" : item.src[f'{server}'],
            }) 
           
            if request.method =='POST':
                email = request.form.get('email')
                messageCheckbox = request.form.getlist('messageCheckbox')
                
                subject = "Khảo sát Movie Website"
                message = ", ".join(messageCheckbox)

                msg = Message(
                        subject=f'{subject} của {server.title()}',
                        sender= email,
                        recipients=[mail_username],
                    
                        body= f'Email: {email}\nMessage: {message}' 
                    )
                mail.send(msg)

                return render_template('client/movie/movieScreen.html',
                    db =_movie,
                    title = title,
                    description= description,
                    success = True
                )
            return render_template('client/movie/movieScreen.html',
                db =_movie,
                title = title,
                description= description
            )    
       
    else:
        return render_template('404.html', title="Otakime - 404" , description = "Có thể bạn đi nhầm đâu đó...")



