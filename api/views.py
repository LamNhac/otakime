from django.shortcuts import render
from django.contrib.sites.shortcuts import get_current_site

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from firebase import db, user

import uuid

DBFirebaseManga = db.get().val()['manga']
DBFirebaseMovie = db.get().val()['movie']
manga_list = len(db.child("manga").get(
    user['idToken']).val())  # in ra phan tu trong manga
_dict = {
    "isSuccess": any,
    "message": any,
    "data": any
}


def home(request):
    return render(request=request, template_name='api.html')


class Manga(APIView):
    def get(self, request):
        _dict['isSuccess'] = any
        _dict['message'] = any
        _dict['data'] = any
        if _dict['data']:

            _dict['isSuccess'] = True
            _dict['message'] = "Thành công"
            _dict['data'] = DBFirebaseManga
            return Response(data=_dict, status=status.HTTP_200_OK)
        else:
            _dict['isSuccess'] = False
            _dict['message'] = "Thất bại"
            _dict['data'] = None
            return Response(data=_dict, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        _dict['isSuccess'] = any
        _dict['message'] = any
        _dict['data'] = any

        getDatafromPost = request.data
        try:
            db.child("manga").child(manga_list).update({
                "id": str(uuid.uuid4()),
                "nameMovie": getDatafromPost["nameMovie"],
                "author": getDatafromPost['author']
            }, user['idToken'])

            _dict['data'] = {}
            _dict['isSuccess'] = True
            _dict['message'] = "Thành công"
            return Response(data=_dict, status=status.HTTP_200_OK)
        except:
            _dict['isSuccess'] = False
            _dict['message'] = "Thất bại"
            _dict['data'] = None
            return Response(data=_dict, status=status.HTTP_404_NOT_FOUND)
    def delete(self, request):
        _dict['isSuccess'] = any
        _dict['message'] = any
        _dict['data'] = any



class MangaDetail(APIView):
    def get(self, request, id):
        _dict['isSuccess'] = any
        _dict['message'] = any
        _dict['data'] = any

        for item in DBFirebaseManga:
            if item['id'] == id:
                _dict['data'] = item
                _dict['isSuccess'] = True
                _dict['message'] = "Thành công"
                return Response(data=_dict, status=status.HTTP_200_OK)
        else:
            _dict['isSuccess'] = False
            _dict['message'] = "Thất bại"
            _dict['data'] = None
            return Response(data=_dict, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        pass


class MangaChapter(APIView):
    def get(self, request, id, chapter):
        # Lấy thông tin user theo ID từ Firebase
        _dict['isSuccess'] = any
        _dict['message'] = any
        _dict['data'] = any
        for item in DBFirebaseManga:
            if item['id'] == id:
                for keyChapter, valueChapter in item['chapter'].items():
                    if chapter == keyChapter:
                        _dict['data'] = {
                            "chapter": keyChapter,
                            "imgChapter": valueChapter
                        }
                        _dict['isSuccess'] = True
                        _dict['message'] = "Thành công"
                        return Response(data=_dict, status=status.HTTP_200_OK)

        _dict['isSuccess'] = False
        _dict['message'] = "Thất bại"
        _dict['data'] = None
        return Response(data=_dict, status=status.HTTP_404_NOT_FOUND)


class Movie(APIView):
    def get(self, request):
        _dict['isSuccess'] = any
        _dict['message'] = any
        _dict['data'] = any
        if _dict['data']:

            _dict['isSuccess'] = True
            _dict['message'] = "Thành công"
            _dict['data'] = DBFirebaseMovie
            return Response(data=_dict, status=status.HTTP_200_OK)
        else:
            _dict['isSuccess'] = False
            _dict['message'] = "Thất bại"
            _dict['data'] = None
            return Response(data=_dict, status=status.HTTP_404_NOT_FOUND)


class MovieDetail(APIView):
    def get(self, request, id):
        _dict['isSuccess'] = any
        _dict['message'] = any
        _dict['data'] = any

        for item in DBFirebaseMovie:
            if item['id'] == id:
                _dict['data'] = item
                _dict['isSuccess'] = True
                _dict['message'] = "Thành công"
                return Response(data=_dict, status=status.HTTP_200_OK)
        else:
            _dict['isSuccess'] = False
            _dict['message'] = "Thất bại"
            _dict['data'] = None
            return Response(data=_dict, status=status.HTTP_404_NOT_FOUND)
