from django.contrib.auth.models import AbstractUser
from django.db.models import CharField, EmailField, OneToOneField, Model, CASCADE
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
from essayfeeds.users.managers import UserManager
import random
import string


def generate_random_id(length=4):
    pools = [char for char in random.choices(string.ascii_uppercase, k=length)]
    return "".join(pools)



class User(AbstractUser):
    """
    Default custom user model for essayfeeds.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    # First and last name do not cover name patterns around the globe
    name = CharField(_("Name of User"), blank=True, max_length=255)
    first_name = None  # type: ignore
    last_name = None  # type: ignore
    email = EmailField(_("email address"), unique=True)
    username = None  # type: ignore

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_absolute_url(self) -> str:
        """Get URL for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"pk": self.id})


class Profile(Model):
    user=OneToOneField(User, on_delete=CASCADE, related_name="profile_user")
    full_name = models.CharField(max_length=200, blank=True, null=True)
    phone_number = PhoneNumberField(blank=True)
    clientId = models.CharField(max_length=109, blank=True, null=True)

    def __str__(self):
        generate_random_id()
        return str(self.full_name) or str(self.user.email)
    
    @property
    def client_id(self):
        return self.get_profile_id()
    
    def get_profile_id(self):
        return generate_random_id()
    
    def save(self, *args, **kwargs):
        if self.clientId:
            return super().save(*args, **kwargs)
        self.clientId = f"{self.get_profile_id()}-{self.pk}"
        return super().save(*args, **kwargs)
    
    
