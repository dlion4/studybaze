from django.urls import path, include
from . import views
from .forms import OrderForm
from .views import (
    essay_feed_order_view,
    essay_feed_confirm_order_view, EssayFeedOrderView
)


urlpatterns = [
    path("", views.essay_feed_home_view, name="home"),
    path("order/", view=essay_feed_order_view, name="order"),
    # path("order/", view=EssayFeedOrderView(OrderForm), name="order"),
    path("confirm/", view=essay_feed_confirm_order_view, name="confirm_order")
]


urlpatterns += [
    path("order/", include("essayfeeds.payments.urls"))
]