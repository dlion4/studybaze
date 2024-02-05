from django.urls import path, include
from . import views


urlpatterns = [
    path("login", views.essay_feed_login_view, name="login"),
]
