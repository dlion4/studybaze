from django.urls import path, include
from . import views
from .views import (
    essay_feed_order_view,essay_feed_confirm_order_view
)


urlpatterns = [
    path("", views.essay_feed_home_view, name="home"),
    path("order/", view=essay_feed_order_view, name="order"),
    path("confirm/", view=essay_feed_confirm_order_view, name="confirm_order")
]
