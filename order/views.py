from django.shortcuts import render
from django.views.generic import TemplateView


# Create your views here.
class EssayFeedOrderView(TemplateView):
    template_name = "pages/order.html"


essay_feed_order_view = EssayFeedOrderView.as_view()



class EssayFeedConfirmOrderView(TemplateView):
    template_name = "pages/confirm_order.html"


essay_feed_confirm_order_view = EssayFeedOrderView.as_view()