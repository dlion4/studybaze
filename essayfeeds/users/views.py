from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import DetailView, RedirectView, UpdateView, TemplateView

User = get_user_model()


class UserDetailView(LoginRequiredMixin, DetailView):
    model = User
    slug_field = "id"
    slug_url_kwarg = "id"


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