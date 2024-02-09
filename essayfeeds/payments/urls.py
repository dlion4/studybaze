from django.urls import path, include
from .views import (
EssayFeedOrderItemView,EssayFeedsOrderUpdateView,
EssayFeedsPaymentSuccessFulView,
EssayFeedsPaymentFailedView,

get_payment_view
)


urlpatterns = [
    path("<str:order_id>/", view=EssayFeedOrderItemView.as_view(), name="order_detail"),
    path("<int:pk>/update/", view=EssayFeedsOrderUpdateView.as_view(), name="order_update"),
    path("payment-success/<id>/", view=EssayFeedsPaymentSuccessFulView.as_view(), name="payment-success"),
    path("payment-failed/<id>/", view=EssayFeedsPaymentFailedView.as_view(), name="payment-failed"),
    path("payment/<order_pk>", view=get_payment_view, name="payment")
]



