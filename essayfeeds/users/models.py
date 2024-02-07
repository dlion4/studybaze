from django.contrib.auth.models import AbstractUser
from django.db.models import CharField, EmailField, OneToOneField, Model, CASCADE
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
from essayfeeds.users.managers import UserManager
import random
import string
from django.dispatch import receiver
from  django.db.models.signals import post_save
from essayfeeds.utils import generate_random_id



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
    clientId = models.CharField(max_length=109, blank=True, null=True, unique=True)

    def __str__(self):
        if self.full_name: return self.full_name
        else: return self.user.email
    
    @property
    def client_id(self):
        return self.get_profile_id()
    
    def get_profile_id(self):
        return generate_random_id()
    
    def save(self, *args, **kwargs):
        if self.clientId:
            return super().save(*args, **kwargs)
        self.clientId = f"{self.get_profile_id()}-{self.user.pk}"
        return super().save(*args, **kwargs)
    

@receiver(post_save, sender=User)
def profile_post_save_on_user_create_receiver(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    else:
        instance.profile_user.save()
    
