from typing import Any
from django.shortcuts import redirect
from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib import messages

from django.db.models.base import Model as Model
from django.db.models.query import QuerySet
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import DetailView, RedirectView, UpdateView, TemplateView
from .models import Profile
from essayfeeds.payments.models import OrderItem
from essayfeeds.classwork.models import Order
from allauth.account.views import SignupView
from .forms import UserProfileSignUpForm
from essayfeeds.payments.mixins import SuccessRedirectView
User = get_user_model()


class AccountProfileSignupView(SuccessRedirectView):
    # tHIS IS NBOT AN OPTIMIZED METHOD YET

    form_class = UserProfileSignUpForm
    user = User
    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get("email")
            user = self.user.objects.filter(email=email)
            if user.exists():
                return redirect("account_login")
            else:
                password = form.cleaned_password2()
                if password:
                    user = User.objects.create(email=email)
                    user.set_password(password)
                    user.save()
                    user.backend = 'django.contrib.auth.backends.ModelBackend'
                    login(request, user)
                    return redirect(user)
                messages.error(request, "Password did nbot match!")
        return self.get_redirect_url()
    


account_profile_signup_view = AccountProfileSignupView.as_view()

class AccountLogoutView(SuccessRedirectView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return redirect("home")
    
user_logout_view = AccountLogoutView.as_view()

# def get_logout_view(request):
#     if request.method == "POST":
#         user = User.objects.get(pk=request.POST.get("user_id"))
#         logout(request)

class UserDetailView(LoginRequiredMixin, DetailView):
    model = User
    slug_field = "id"
    slug_url_kwarg = "id"
    template_name = "accounts/profile/user_view.html"


    def get_profile(self, **kwargs):
        """This functionreturn the related profile with the current user in session"""
        return Profile.objects.get(user=self.get_object())

    def get_context_data(self, **kwargs):
        # This will then update the context dictionary to be displayed on the user ui
        context = super().get_context_data(**kwargs)
        context['client'] = self.get_profile(**kwargs)
        context['orders'] = OrderItem.objects.filter(order__profile=self.get_profile(**kwargs), status="Active").all()
        return context


user_detail_view = UserDetailView.as_view()


class UserUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = User
    fields = ["name"]
    success_message = _("Information successfully updated")

    def get_success_url(self):
        assert self.request.user.is_authenticated  # for mypy to know that the user is authenticated
        return self.request.user.get_absolute_url()

    def get_object(self):
        return self.request.user


user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):
    permanent = False

    def get_redirect_url(self):
        return reverse("users:detail", kwargs={"pk": self.request.user.pk})


user_redirect_view = UserRedirectView.as_view()



# Create your views here.

class EssayFeedLoginView(TemplateView):
    template_name = "accounts/login.html"


essay_feed_login_view = EssayFeedLoginView.as_view()


class EssayFeedUserAreaView(TemplateView):
    template_name = "accounts/profile/user_view.html"


essay_feed_user_view = EssayFeedUserAreaView.as_view()


class EssayFeedUserUpdateView(TemplateView):
    template_name = "accounts/profile/update.html"

essay_feed_user_update_view = EssayFeedUserUpdateView.as_view()


class EssayFeedRegisterDisputeView(TemplateView):
    template_name = "accounts/profile/register_dispute.html"


essay_feed_register_dispute_view = EssayFeedRegisterDisputeView.as_view()


class EssayFeedRegisterDisputeSuccessView(TemplateView):
    template_name = "accounts/profile/complaintRegisteredSuccess.html"


essay_feed_register_dispute_sucess_view = EssayFeedRegisterDisputeSuccessView.as_view()

class EssayFeedViewDisputeView(TemplateView):
    template_name = "accounts/profile/view_dispute.html"


essay_feed_dispute_view = EssayFeedViewDisputeView.as_view()


class EssayFeedOpenDisputeView(TemplateView):
    template_name = "accounts/profile/opendisputes.html"

essay_feed_open_dispute_view = EssayFeedOpenDisputeView.as_view()


class EssayFeedLoyaltyView(TemplateView):
    template_name = "accounts/profile/loyaltypoints.html"

essay_feed_loyalty_point_view = EssayFeedLoyaltyView.as_view()



class EssayFeedReferralView(TemplateView):
    template_name = "accounts/profile/referral.html"

essay_feed_referral_view = EssayFeedReferralView.as_view()


class EssayFeedCustomerFeedBackView(TemplateView):
    template_name = "accounts/profile/customerfeedback.html"


essay_feed_customerfeedback_view = EssayFeedCustomerFeedBackView.as_view()