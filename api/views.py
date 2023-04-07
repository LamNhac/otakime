from django.shortcuts import render


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from firebase import db

# Create your views here.


def index(request):
    _status = status.HTTP_200_OK
    return Response(data="Thành công", status=_status)


class Manga(APIView):
    def get(self, request):
        DBFirebaseManga = db.get().val()['manga']
        return Response(data=DBFirebaseManga, template_name='api.html')


class MangaDetail(APIView):
    def get(self, request, id):
        # Lấy thông tin user theo ID từ Firebase
        DBFirebaseManga = db.get().val()['manga']
        _dict = {}
        for key, value in DBFirebaseManga.items():
            if value['id'] == id:
                _dict.update(value)
        return Response(data=_dict)


class Movie(APIView):
    def get(self, request):
        DBFirebaseMovie = db.get().val()['movie']
        return Response(data=DBFirebaseMovie)


class MovieDetail(APIView):
    def get(self, request, id):
        # Lấy thông tin user theo ID từ Firebase
        DBFirebaseMovie = db.get().val()['movie']
        _dict = {}
        for key, value in DBFirebaseMovie.items():
            if value['id'] == id:
                _dict.update(value)
        return Response(data=_dict)
