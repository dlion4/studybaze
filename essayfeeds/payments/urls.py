from django.urls import path, include
from .views import (
EssayFeedOrderItemView,EssayFeedsOrderUpdateView
)


urlpatterns = [
    path("<str:order_id>/", view=EssayFeedOrderItemView.as_view(), name="order_detail"),
    path("<int:pk>/update/", view=EssayFeedsOrderUpdateView.as_view(), name="order_update"),
]
