from typing import Any
from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import OrderForm, AddonForm
from .models import Order, Addon
from essayfeeds.users.models import Profile

# Create your views here.
class EssayFeedHomeView(TemplateView):
    template_name = "home.html"


essay_feed_home_view = EssayFeedHomeView.as_view()



class EssayFeedOrderView(LoginRequiredMixin, TemplateView):
    template_name = "pages/order.html"
    from_class = OrderForm

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context['form'] = self.from_class()
        context['addons'] = Addon.objects.all()
        context['client'] = Profile.objects.get(user=self.request.user)
        return context


essay_feed_order_view = EssayFeedOrderView.as_view()



class EssayFeedConfirmOrderView(TemplateView):
    template_name = "pages/confirm_order.html"


essay_feed_confirm_order_view = EssayFeedConfirmOrderView.as_view()