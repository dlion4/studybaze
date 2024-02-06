from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.
class EssayFeedHomeView(TemplateView):
    template_name = "home.html"


essay_feed_home_view = EssayFeedHomeView.as_view()



class EssayFeedOrderView(LoginRequiredMixin, TemplateView):
    template_name = "pages/order.html"

essay_feed_order_view = EssayFeedOrderView.as_view()



class EssayFeedConfirmOrderView(TemplateView):
    template_name = "pages/confirm_order.html"


essay_feed_confirm_order_view = EssayFeedConfirmOrderView.as_view()