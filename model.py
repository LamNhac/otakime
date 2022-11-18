from firebase import db,storage,user
import json

DBFirebaseManga = db.get().val()['manga']
DBFirebaseMovie = db.get().val()['movie']

class Manga: 
    def __init__(self,keyName, nameManga, otherName, author, updateAt, description, tags, chapter, imgMain, imgCover, imgIndex):
        self.keyName= keyName
        self.nameManga= nameManga
        self.otherName= otherName
        self.author= author
        self.updateAt= updateAt
        self.description= description
        self.tags= tags
        self.imgIndex= imgIndex
        self.imgMain= imgMain
        self.imgCover= imgCover
        self.chapter= chapter 

class Movie: 
    def __init__(self,keyName, nameManga, otherName, author, updateAt, description, tags, src, imgMain, imgCover, imgIndex):
        self.keyName= keyName
        self.nameManga= nameManga
        self.otherName= otherName
        self.author= author
        self.updateAt= updateAt
        self.description= description
        self.tags= tags
        self.imgIndex= imgIndex
        self.imgMain= imgMain
        self.imgCover= imgCover
        self.src= src 
    
def getManga():
    DICT = []
    for key,value in DBFirebaseManga.items():
        DICT.append( 
            Manga(
                keyName=key,
                nameManga= value['nameManga'],
                otherName= value['otherName'],
                author= value['author'],
                updateAt= value['updateAt'],
                description= value['description'],
                tags= value['tags'],
                chapter= value['chapter'],
                imgIndex= value['imgIndex'],
                imgMain= value['imgMain'],
                imgCover= value['imgCover']
            )
        )
    return DICT


def getMovie():
    DICT = []
    for key,value in DBFirebaseMovie.items():
        DICT.append( 
            Movie(
                keyName=key,
                nameManga= value['nameMovie'],
                otherName= value['otherName'],
                author= value['author'],
                updateAt= value['updateAt'],
                description= value['description'],
                tags= value['tags'],
                src= value['src'],
                imgIndex= value['imgIndex'],
                imgMain= value['imgMain'],
                imgCover= value['imgCover']
            )
        )
    return DICT









