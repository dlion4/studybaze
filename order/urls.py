from django.urls import path, include
from . import views


urlpatterns = [
    path("", views.essay_feed_order_view, name="order"),
    path("confirm/", views.essay_feed_confirm_order_view, name="confirm_order")
]
