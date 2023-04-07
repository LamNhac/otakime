from django.urls import path, include
from .views import Manga, MangaDetail, Movie, MovieDetail, MangaChapter, home
from rest_framework import routers, viewsets


urlpatterns = [
    path('api/', home, name="api"),
    path('api/manga', Manga.as_view(), name="api manga "),
    path('api/manga/<id>', MangaDetail.as_view(), name="api manga id"),
    path('api/manga/<id>/<chapter>', MangaChapter.as_view(), name="api manga id"),
    path('api/movie', Movie.as_view(), name="api movie "),
    path('api/movie/<id>/', MovieDetail.as_view(), name="api movie id ")
]
