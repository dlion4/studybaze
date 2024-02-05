from django.shortcuts import render
from django.views.generic import TemplateView


# Create your views here.
class EssayFeedHomeView(TemplateView):
    template_name = "home.html"


essay_feed_home_view = EssayFeedHomeView.as_view()