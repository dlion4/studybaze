from django.urls import path, include
from . import views
from essayfeeds.users.views import (
    user_detail_view,
    user_redirect_view,
    user_update_view,
    account_profile_signup_view
)
from essayfeeds.finance.views import EssayFeedsFinanceView, EssayFeedsPaymentButton

app_name="users"
urlpatterns = [
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("<int:pk>/", view=user_detail_view, name="detail"),
]


urlpatterns += [
    path("login/", views.essay_feed_login_view, name="login"),
    path("logout/", views.user_logout_view, name="logout"),
    path("signup/profile/", view=account_profile_signup_view, name='account_profile_signup'),
    path("userarea/", views.essay_feed_user_view, name="user_area_view"),
    path("userupdate/", views.essay_feed_user_update_view, name="user_update_view"),
    path("register-dispute/", views.essay_feed_register_dispute_view, name="dispute_register_view"),
    path("register-dispute/success", views.essay_feed_register_dispute_sucess_view, name="dispute_register_success_view"),
    path("view-dispute/", views.essay_feed_dispute_view, name="dispute_view"),
    path("open-dispute/", views.essay_feed_open_dispute_view, name="open_dispute_view"),
    path("loyalty-points/", views.essay_feed_loyalty_point_view, name="loyalty_points_view"),
    path("referrer-friend/", views.essay_feed_referral_view, name="referrer"),
    path("customerfeedback/", views.essay_feed_customerfeedback_view, name="customerfeedback_view"),
    
]

# orderitem urls

urlpatterns += [
    path("order/", include("essayfeeds.payments.helpers.urls"))
]

# update urls

urlpatterns += [
    path("userupdate/", include("essayfeeds.users.funcs.urls")),
]
# finance urls

urlpatterns += [
    path("finance/", view=EssayFeedsFinanceView.as_view(), name="finance"),
    path("payment/<id>/", view=EssayFeedsPaymentButton.as_view(), name="payment"),
]