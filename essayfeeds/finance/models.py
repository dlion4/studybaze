from django.db import models
from essayfeeds.users.models import Profile
# Create your models here.
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.urls import reverse

class Deposit(models.Model):
    client = models.OneToOneField(Profile, on_delete=models.CASCADE)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_verified=models.BooleanField(default=False)

    def __str__(self):
        return f"{self.client.user.email} {self.amount}"
    
    def get_absolute_url(self):
        return reverse("users:payment", kwargs={"id": self.pk})
    
    def get_cancel_url(self):
        # This functrion willl generate the absolute url for cancelling the orderitem and the removing  the order from the ordritem model
        return reverse("users:cancel", kwargs={"id": self.pk})
    
    class Meta:
        get_latest_by = "timestamp"
    
    

@receiver(post_save, sender=Profile)
def deposit_post_save_on_user_create_receiver(sender, instance, created, **kwargs):
    if created:
        Deposit.objects.create(client=instance)
    else:
        pass