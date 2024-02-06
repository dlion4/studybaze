from django.dispatch import receiver
from  django.db.models.signals import post_save
from .models import User, Profile


@receiver(post_save, sender=User)
def profile_post_save_on_user_create_receiver(sender, instance, created, **kwargs):
    if created: Profile.objects.create(user=instance)
    
