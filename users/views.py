from django.shortcuts import render
from django.views.generic import TemplateView

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