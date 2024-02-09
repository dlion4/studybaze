from django.urls import path
from essayfeeds.payments.helpers.views import (
    EssayFeedsOrderItemCancelView
)
# User orderitem related urls
urlpatterns = [
    path("<id>/", view=EssayFeedsOrderItemCancelView.as_view(), name="cancel"),
]