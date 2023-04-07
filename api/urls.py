from django.urls import path
from .views import Manga, MangaDetail, Movie,MovieDetail, index

urlpatterns = [
    # path('', views.home, name="home"),
    path('api', index, name="api"),
    path('api/manga', Manga.as_view(), name="api manga "),
    path('api/manga/<id>', MangaDetail.as_view(), name="api manga id"),

    path('api/movie', Movie.as_view(), name="api movie "),
    path('api/movie/<id>/', MovieDetail.as_view(), name="api movie id ")
    # path('', views.index, name="manga"),
    # path('', views.index, name="about")
]
