from .update import *
from django.urls import path


urlpatterns = [
    path("name/", view=update_profile_name, name='update-name'),
    path("email/", view=update_user_email, name='update-email'),
    path("password/", view=update_user_password, name='update-password'),
    path("phone/", view=update_profile_phone_number, name='update-phone'),
]
