from typing import Any
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from django.views.generic import TemplateView, UpdateView
from essayfeeds.users.models import Profile, User
from essayfeeds.classwork.models import Order
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from essayfeeds.classwork.forms import OrderForm
from django.utils.translation import gettext_lazy as _
from formtools.wizard.views import SessionWizardView
from django.http import HttpResponse, HttpResponseRedirect
from .models import OrderItem
from paypal.standard.forms import PayPalPaymentsForm
from django.contrib import messages
from essayfeeds.finance.models import Deposit

# Create your views here.
class EssayFeedOrderItemView(LoginRequiredMixin, TemplateView):
    template_name = "pages/confirm_order.html"

    def get_order_object(self, **kwargs):
        return get_object_or_404(Order, pk=kwargs.get("order_id"))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['client'] = Profile.objects.get(user=self.request.user)
        context['order'] = self.get_order_object(**kwargs)
        # context['form'] = self.get_payment_context_data(**kwargs)
        return context
    
    
    def post(self, request, *args, **kwargs):
        order = self.get_order_object(**kwargs)
        order_item = OrderItem.objects.filter(order=order)
        is_deposit = Deposit.objects.filter(client=Profile.objects.get(user=request.user))
        if order_item.exists():
            new_order_item = order_item.first()
            new_order_item.order=order
            new_order_item.price=order.price
            new_order_item.save()
            if is_deposit:
                deposit = Deposit.objects.get(client=Profile.objects.get(user=request.user))
                if deposit.amount > new_order_item.price:
                    new_deposit = deposit.amount - float(new_order_item.price)
                    deposit.amount = new_deposit
                    deposit.save()
                    messages.success(request, "Order placed succesfully")
                    return redirect(request.user)
                return redirect(new_order_item)
            return redirect(new_order_item)
        else:
            order_item, _ = OrderItem.objects.update_or_create(order=order, price=order.price)
            if is_deposit:
                deposit = Deposit.objects.get(client=Profile.objects.get(user=request.user))
                if deposit.amount > order_item.price:
                    new_deposit = deposit.amount - float(order_item.price)
                    deposit.amount = new_deposit
                    deposit.save()
                    messages.success(request, "Order placed succesfully")
                    return redirect(request.user)
                return redirect(order_item)
            return redirect(order_item)



def get_payment_view(request, order_pk):
    order_item = get_object_or_404(OrderItem, pk=order_pk)
    paypal_dict = {
            "business": "sb-ruw7126979243@business.example.com",
            "amount": float(order_item.price),
            "item_name": str(order_item.order.title),
            "invoice":  str(order_item.order.orderId),
            # "notify_url": self.request.build_absolute_uri(reverse('paypal-ipn')),
            "return": request.build_absolute_uri(reverse('payment-success' , kwargs={"id": order_pk})),
            "cancel_return": request.build_absolute_uri(reverse('payment-failed', kwargs={"id": order_pk})),
            # "custom": "premium_plan",  # Custom command to correlate to some function later (optional)
        }
    form = PayPalPaymentsForm(initial=paypal_dict)
    return render(request, "pages/order/payment.html", {"form": form})
        



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
    



class EssayFeedMixinView(TemplateView):

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context['item'] = self.get_object(**kwargs)
        return context
    
    def get_object(self,is_paid:bool=False, **kwargs):
        # return get_object_or_404(Order, pk=kwargs.get("pk"))
        order_item = get_object_or_404(OrderItem, pk=kwargs.get("id"))
        order_item.is_paid=is_paid
        order_item.save()
        return order_item
    
class EssayFeedsPaymentSuccessFulView(EssayFeedMixinView):
    template_name = "pages/order/success.html"

    def get_object(self, is_paid: bool = True, **kwargs):
        return super().get_object(is_paid, **kwargs)

    
class EssayFeedsPaymentFailedView(EssayFeedMixinView):
    template_name = "pages/order/fail.html"
    


    

