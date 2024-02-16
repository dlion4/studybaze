from typing import Any
from django.shortcuts import render, redirect
from django.views.generic import DetailView, RedirectView, UpdateView, TemplateView
from .models import Deposit, Profile
from django.contrib.auth.mixins import LoginRequiredMixin
from paypal.standard.forms import PayPalPaymentsForm
from django.urls import reverse

# Create your views here.
class EssayFeedsFinanceView(LoginRequiredMixin, TemplateView):
    template_name = "accounts/profile/finance.html"
    
    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context['form'] = None
        context['deposit'] = Deposit.objects.get(client=Profile.objects.get(user=self.request.user))

        return context
    
    def post(self, request, *args, **kwargs):
        amount = float(request.POST.get("deposit1"))
        deposit = Deposit.objects.get(
            client=Profile.objects.get(user=self.request.user),
            )
        deposit.amount+=amount
        deposit.save()
        
        return redirect(deposit)
    

class EssayFeedsPaymentButton(LoginRequiredMixin, TemplateView):
    template_name = "pages/order/payment.html"
    deposit = Deposit

    def get_deposit(self):
        return self.deposit.objects.filter(client=Profile.objects.get(user=self.request.user)).latest()

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context['form'] = self.get_payment_button(**kwargs)
        return context
    
    def get_payment_button(self, **kwargs):
        paypal_dict = {
                "business": "sb-ruw7126979243@business.example.com",
                "amount": float(self.get_deposit().amount),
                "item_name": str(self.get_deposit().client),
                "invoice":  str("Deposit"),
                # "notify_url": self.request.build_absolute_uri(reverse('paypal-ipn')),
                "return": self.request.build_absolute_uri(reverse('payment-success' , kwargs={"id": self.get_deposit().pk})),
                "cancel_return": self.request.build_absolute_uri(reverse('payment-failed', kwargs={"id":self.get_deposit().pk})),
                # "custom": "premium_plan",  # Custom command to correlate to some function later (optional)
            }
        form = PayPalPaymentsForm(initial=paypal_dict)
        return form