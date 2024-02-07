from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import TemplateView, UpdateView
from essayfeeds.users.models import Profile, User
from essayfeeds.classwork.models import Order
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from essayfeeds.classwork.forms import OrderForm
from django.utils.translation import gettext_lazy as _
from formtools.wizard.views import SessionWizardView
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.
class EssayFeedOrderItemView(TemplateView):
    template_name = "pages/confirm_order.html"

    def get_order_object(self, **kwargs):
        return get_object_or_404(Order, pk=kwargs.get("order_id"))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['client'] = Profile.objects.get(user=self.request.user)
        context['order'] = self.get_order_object(**kwargs)
        return context
    



class EssayFeedsOrderUpdateView(LoginRequiredMixin,TemplateView):
    form_class = OrderForm
    template_name = "pages/order_update.html"
    success_message = _("Information successfully updated")

    def get_object(self, **kwargs):
        return get_object_or_404(Order, pk=kwargs.get("pk"))

    def get_form_initial(self, step):
        return self.initial_dict.get(step, {})

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = self.form_class(instance=self.get_object(**kwargs))
        context['order'] = self.get_object(**kwargs)
        context['client'] = Profile.objects.get(user=self.request.user)
        return context
    
    def post(self, request, *args, **kwargs):
        order = self.get_object(**kwargs)
        form = self.form_class(self.request.POST,request.FILES, instance=order)
        if form.is_valid():
            form.save()
            return redirect(order)
        return HttpResponseRedirect(self.request.META.get("HTTP_REFERER"))
    



