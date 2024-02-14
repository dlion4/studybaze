import os
from typing import Any
from django.shortcuts import redirect
from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import OrderForm #AddonSelectionFormForm
from .models import Order, Addon
from django.http import HttpResponse, HttpResponseRedirect
from essayfeeds.users.models import Profile
from formtools.wizard.views import SessionWizardView
from formtools.preview import FormPreview
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from essayfeeds.utils import generate_random_id
from essayfeeds.users.forms import UserProfileSignUpForm

# Create your views here.
class EssayFeedHomeView(TemplateView):
    template_name = "home.html"

    form_class = UserProfileSignUpForm

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context['form'] = self.form_class()
        return context
    



essay_feed_home_view = EssayFeedHomeView.as_view()

def show_message_form_condition(wizard):
    # try to get the cleaned data of step 1
    cleaned_data = wizard.get_cleaned_data_for_step('0') or {}
    # check if the field ``leave_message`` was checked.
    return cleaned_data.get('profile', True)

class EssayFeedOrderView(LoginRequiredMixin, TemplateView):
    template_name = "pages/order.html"
    form_class = OrderForm
    # preview_template = 'pages/order/order_preview.html'
    file_storage = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'photos'))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['client'] = Profile.objects.get(user=self.request.user)
        context['form'] = self.form_class()
        return context
    
    def post(self, request,*args, **kwargs):
        order_form = self.form_class(request.POST, request.FILES)
        if order_form.is_valid():
            order = order_form.save(commit=True)
            order.profile=Profile.objects.get(user=self.request.user)
            if Order.objects.filter(pk=order.pk).exists():
                return redirect(order)
            order.save()
            return redirect(order)
        context = {
            **self.get_context_data(**kwargs),
            "form":order_form
        }
        return render(request, self.template_name, context)


essay_feed_order_view = EssayFeedOrderView.as_view()



class EssayFeedConfirmOrderView(TemplateView):
    template_name = "pages/confirm_order.html"


essay_feed_confirm_order_view = EssayFeedConfirmOrderView.as_view()



class EssayFeedsFaqView(TemplateView):
    template_name = "pages/faq.html"


essayfeeds_faq_view = EssayFeedsFaqView.as_view()