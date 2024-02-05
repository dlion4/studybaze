from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.

class EssayFeedLoginView(TemplateView):
    template_name = "accounts/login.html"


essay_feed_login_view = EssayFeedLoginView.as_view()