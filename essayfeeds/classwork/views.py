import os
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

# Create your views here.
class EssayFeedHomeView(TemplateView):
    template_name = "home.html"


essay_feed_home_view = EssayFeedHomeView.as_view()

def show_message_form_condition(wizard):
    # try to get the cleaned data of step 1
    cleaned_data = wizard.get_cleaned_data_for_step('0') or {}
    # check if the field ``leave_message`` was checked.
    return cleaned_data.get('profile', True)

class EssayFeedOrderView(LoginRequiredMixin, SessionWizardView):
    template_name = "pages/order.html"
    form_list = [OrderForm,]
    # preview_template = 'pages/order/order_preview.html'
    file_storage = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'photos'))

    def get_context_data(self, form, **kwargs):
        context = super().get_context_data(form, **kwargs)
        context['client'] = Profile.objects.get(user=self.request.user)
        return context
    
    def done(self, form_list, **kwargs):
        order_form = form_list[0]
        if order_form.is_valid():
            order = order_form.save(commit=True)
            order.profile=Profile.objects.get(user=self.request.user)
            if Order.objects.filter(pk=order.pk).exists():
                pass
            order.save()
            return redirect(order)
        # redirect to oirder payment
        return HttpResponseRedirect(self.request.META.get("HTTP_REFERER"))


essay_feed_order_view = EssayFeedOrderView.as_view()



class EssayFeedConfirmOrderView(TemplateView):
    template_name = "pages/confirm_order.html"


essay_feed_confirm_order_view = EssayFeedConfirmOrderView.as_view()