from django.urls import path, include
from . import views


urlpatterns = [
    path("login", views.essay_feed_login_view, name="login"),
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
