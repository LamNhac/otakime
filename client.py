
from flask import Blueprint,render_template,request
from model import getManga,getMovie
client = Blueprint('client', __name__)

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
    imgAds = "https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/logo%2Fyuru-camp-movie-ad.jpg?alt=media&token=66bc426f-e92d-4934-837a-7987197e95ec"
    urlMovie = "yuru-camp"

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

    return render_template('404.html')

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

@client.route('/wheel', methods = ['GET','POST'])
def wheel():

    return render_template('client/wheel.html')

@client.route('/movie')
def movie():
    title=""
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
            "stars" :item.stars
  
       })
    for key,value in _movie.items():
        print(key, value)
    return render_template('client/movie/movie.html',            
        db = _movie
    )
@client.route('/movie/<urlMovie>')
def movieScreen(urlMovie):
    title=""
    description=""   
    _movie = {}
    for item in getMovie():
        if urlMovie == item.keyName.lower().replace(' ','-'):
            _movie.update({
                "keyName":item.keyName,
                "src" : item.src,
            }) 
            #print(_movie['src'])
            return render_template('client/movie/movieScreen.html',
            db =_movie,
            )

       
