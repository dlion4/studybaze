from django.urls import path, include
from . import views


urlpatterns = [
    path("", views.essay_feed_home_view, name="home"),
]
